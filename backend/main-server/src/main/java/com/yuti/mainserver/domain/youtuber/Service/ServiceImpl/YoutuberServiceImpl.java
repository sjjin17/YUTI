package com.yuti.mainserver.domain.youtuber.Service.ServiceImpl;

import com.yuti.mainserver.domain.youtuber.Service.YoutuberService;
import com.yuti.mainserver.domain.youtuber.dto.YoutuberResponseDto;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;

@RequiredArgsConstructor
@Service
public class YoutuberServiceImpl implements YoutuberService {

    private final RestHighLevelClient restHighLevelClient;

    @Value("${es.index}")
    private String index;

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

            return Arrays.stream(searchResponse.getHits().getHits())
                    .map(hit -> YoutuberResponseDto.toResponseDto(hit.getSourceAsMap()))
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
