package com.yuti.mainserver.domain.mbti.service.impl;

import com.yuti.mainserver.domain.mbti.domain.MBTI;
import com.yuti.mainserver.domain.mbti.dto.MbtiRecommendResponseDto;
import com.yuti.mainserver.domain.mbti.service.MbtiService;
import com.yuti.mainserver.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.script.Script;
import org.elasticsearch.script.ScriptType;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.MultiBucketsAggregation;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.ScriptSortBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.termQuery;
import static org.elasticsearch.index.query.QueryBuilders.termsQuery;

@RequiredArgsConstructor
@Service
public class MbtiServiceImpl implements MbtiService {

    private final RestHighLevelClient restHighLevelClient;

    @Override
    public List<MbtiRecommendResponseDto> recommendYoutubers(String mbti) {
        if(!Arrays.stream(MBTI.values()).anyMatch(mbtiEnum -> mbtiEnum.toString().equals(mbti)))
            throw new CustomException("유효한 MBTI가 아닙니다.");

        try{
            List<String> top3ChannelIds = recommendTop3(mbti);
            SearchResponse top3Youtubers = findYoutuberInfo(top3ChannelIds);

            return Arrays.stream(top3Youtubers.getHits().getHits())
                    .map(hit -> MbtiRecommendResponseDto.toResponseDto(hit.getSourceAsMap()))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Long findAllParticipant() {
        try {
            SearchResponse response = restHighLevelClient.search(new SearchRequest("mbti-result"), RequestOptions.DEFAULT);
            return response.getHits().getTotalHits().value;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private List<String> recommendTop3(String mbti) throws IOException {
        SearchRequest aggRequest = new SearchRequest("mbti-result");
        aggRequest.source(new SearchSourceBuilder()
                .query(termQuery("mbti", mbti))
                .aggregation(AggregationBuilders.terms("youtuber_aggs")
                        .field("youtubers.keyword")
                        .size(3)));

        SearchResponse aggResponse = restHighLevelClient.search(aggRequest, RequestOptions.DEFAULT);

        Terms terms = aggResponse.getAggregations().get("youtuber_aggs");
        return terms.getBuckets().stream()
                .map(MultiBucketsAggregation.Bucket::getKeyAsString)
                .collect(Collectors.toList());
    }

    private SearchResponse findYoutuberInfo(List<String> top3ChannelIds) throws IOException {
        Map<String, Integer> scores = new HashMap<>();
        for(int i = 0; i < top3ChannelIds.size(); i++) {
            scores.put(top3ChannelIds.get(i), i);
        }
        Map<String, Object> params = new HashMap<>();
        params.put("scores", scores);

        SearchRequest top3YoutuberRequest = new SearchRequest("youtuber_analyzer");
        top3YoutuberRequest.source(new SearchSourceBuilder()
                .sort(SortBuilders.scriptSort(
                        new Script(ScriptType.INLINE, "painless", "return params.scores[doc.channel_id.value]", params),
                        ScriptSortBuilder.ScriptSortType.NUMBER
                ))
                .query(termsQuery("channel_id", top3ChannelIds)));

        return restHighLevelClient.search(top3YoutuberRequest, RequestOptions.DEFAULT);
    }
}
