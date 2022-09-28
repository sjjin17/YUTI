package com.yuti.mainserver.domain.youtuber.service.impl;

import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchResult;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yuti.mainserver.domain.youtuber.dto.YoutuberResponseDto;
import com.yuti.mainserver.domain.youtuber.service.YoutuberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
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
    @Value("${youtube.key}")
    private String apiKey;

    private static String PROPERTIES_FILENAME = "youtube.properties";
    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();

    private static YouTube youtube;

    @Override
    public List<YoutuberResponseDto> searchYoutuber(String keyword, int offset) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(matchQuery("channel_name", keyword))
                .from(offset)
                .size(50);

        SearchRequest searchRequest = new SearchRequest(index);
        searchRequest.source(searchSourceBuilder);

        try{
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

            if(searchResponse.getHits().getTotalHits().value == 0) {
                return searchUsingYoutubeApi(keyword);
            } else
                return Arrays.stream(searchResponse.getHits().getHits())
                    .map(hit -> YoutuberResponseDto.toResponseDto(hit.getSourceAsMap()))
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private List<YoutuberResponseDto> searchUsingYoutubeApi(String keyword) throws IOException {
        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
            public void initialize(HttpRequest request) throws IOException {}})
                .setApplicationName("youtube-channel-search")
                .build();

        YouTube.Search.List search = youtube.search().list("snippet");
        search.setKey(apiKey);
        search.setQ(keyword);
        search.setType("channel");

        List<SearchResult> response = search.execute().getItems();
        List<YoutuberResponseDto> searchYoutubers = response.stream()
                .map(YoutuberResponseDto::toResponseDto)
                .collect(Collectors.toList());

        Gson gson = new GsonBuilder()
                .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                .create();
        searchYoutubers.forEach(youtuber -> {
            try {
                SearchResponse status = restHighLevelClient.search(
                        new SearchRequest(index).source(
                                new SearchSourceBuilder().query(termQuery("channel_id", youtuber.getChannelId()))
                        ), RequestOptions.DEFAULT);
                if(status.getHits().getTotalHits().value == 0)
                    sendDataToKafka("youtuber-analyzer", gson.toJson(youtuber));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return searchYoutubers;
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
