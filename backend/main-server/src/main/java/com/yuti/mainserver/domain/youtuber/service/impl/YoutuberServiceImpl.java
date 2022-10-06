package com.yuti.mainserver.domain.youtuber.service.impl;

import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yuti.mainserver.domain.youtuber.dto.YoutuberDto;
import com.yuti.mainserver.domain.youtuber.dto.YoutuberResponseDto;
import com.yuti.mainserver.domain.youtuber.service.YoutuberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;
import static org.elasticsearch.index.query.QueryBuilders.termQuery;

@Slf4j
@RequiredArgsConstructor
@Service
public class YoutuberServiceImpl implements YoutuberService {

    private final RestHighLevelClient restHighLevelClient;

    @Value("${es.search-index}")
    private String index;

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${youtube.keys}")
    private List<String> apiKeys;

    private static String PROPERTIES_FILENAME = "youtube.properties";
    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();

    private static YouTube youtube;

    private static List<AvailableKey> availableKeys = new ArrayList<>();

    @Autowired
    public void initKeys() {
        for(String apiKey : apiKeys) {
            availableKeys.add(new AvailableKey(apiKey, LocalDateTime.now(), true));
        }
    }

    @Getter
    static class AvailableKey {
        private String key;
        private LocalDateTime date;
        private boolean isAvailable;

        public AvailableKey(String key, LocalDateTime date, boolean isAvailable) {
            this.key = key;
            this.date = date;
            this.isAvailable = isAvailable;
        }

        public void prohibitKey() {
            this.date = LocalDateTime.now();
            this.isAvailable = false;
        }
    }

    @Override
    public YoutuberResponseDto searchYoutuber(String keyword, String offset) {
        try {
            if (offset.chars().allMatch(Character::isDigit))
                return searchUsingElasticsearch(keyword, Integer.parseInt(offset));
            else
                return searchUsingYoutubeApi(keyword, offset);
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    private YoutuberResponseDto searchUsingElasticsearch(String keyword, int offset) throws IOException {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(matchQuery("channel_name", keyword))
                .from(offset)
                .size(20);

        SearchResponse searchResponse = restHighLevelClient.search(
                new SearchRequest(index).source(searchSourceBuilder), RequestOptions.DEFAULT);

        if(searchResponse.getHits().getTotalHits().value == 0)
            return searchUsingYoutubeApi(keyword, null);

        boolean isLast = searchResponse.getHits().getHits().length + offset == searchResponse.getHits().getTotalHits().value;

        return YoutuberResponseDto.builder()
                .isLast(isLast)
                .youtubers(Arrays.stream(searchResponse.getHits().getHits())
                        .map(hit -> YoutuberDto.toResponseDto(hit.getSourceAsMap()))
                        .collect(Collectors.toList())).build();
    }

    private YoutuberResponseDto searchUsingYoutubeApi(String keyword, String nextPageToken) {
        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
            public void initialize(HttpRequest request) throws IOException {}})
                .setApplicationName("youtube-channel-search")
                .build();

        SearchListResponse response = null;
        for(AvailableKey availableKey : availableKeys) {
            if(availableKey.getDate().getDayOfMonth() == LocalDateTime.now().getDayOfMonth() && !availableKey.isAvailable)
                continue;

            try {
                YouTube.Search.List search = youtube.search().list("snippet");
                search.setKey(availableKey.key)
                        .setQ(keyword)
                        .setMaxResults(20L)
                        .setType("channel");
                if(nextPageToken != null) search.setPageToken(nextPageToken);

                response = search.execute();
                break;
            } catch (IOException e) {
                availableKey.prohibitKey();
            }
        }

        if(response.getItems() == null || response.getItems().size() == 0)
            return YoutuberResponseDto.builder()
                    .isLast(true)
                    .youtubers(new ArrayList<>())
                    .build();

        List<YoutuberDto> searchResults = response.getItems().stream()
                .map(YoutuberDto::toResponseDto)
                .collect(Collectors.toList());
        Set<YoutuberDto> result = new HashSet<>(searchResults);
        List<YoutuberDto> youtubers = new ArrayList<>();
        searchResults.forEach(searchResult -> {
            if(result.contains(searchResult)) {
                youtubers.add(searchResult);
                result.remove(searchResult);
            }
        });
        saveYoutubeInFo(youtubers);

        return YoutuberResponseDto.builder()
                .nextPageToken(response.getNextPageToken())
                .isLast(response.getNextPageToken() == null ? true : false)
                .youtubers(youtubers)
                .build();
    }

    private void saveYoutubeInFo(List<YoutuberDto> youtubers) {
        Gson gson = new GsonBuilder()
                .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                .create();

        youtubers.forEach(youtuber -> {
            SearchResponse status = null;
            try {
                status = restHighLevelClient.search(
                        new SearchRequest(index).source(
                                new SearchSourceBuilder().query(termQuery("channel_id", youtuber.getChannelId()))
                        ), RequestOptions.DEFAULT);
                if(status.getHits().getTotalHits().value == 0)
                    sendDataToKafka("youtuber-analyzer", gson.toJson(youtuber));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void sendDataToKafka(String topic, String data) {
        kafkaTemplate.send(topic, data).addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
            @Override
            public void onFailure(Throwable ex) {
                log.error(ex.getMessage(), ex);
            }

            @Override
            public void onSuccess(SendResult<String, String> result) {
                log.info(result.toString());
            }
        });
    }

}
