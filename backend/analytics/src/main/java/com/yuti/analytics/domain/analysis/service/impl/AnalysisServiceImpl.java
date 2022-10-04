package com.yuti.analytics.domain.analysis.service.impl;

import com.yuti.analytics.domain.analysis.domain.MBTI;
import com.yuti.analytics.domain.analysis.domain.TOPIC;
import com.yuti.analytics.domain.analysis.dto.*;
import com.yuti.analytics.domain.analysis.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.BucketOrder;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Array;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class AnalysisServiceImpl implements AnalysisService {

    private final RestHighLevelClient restHighLevelClient;

    @Value("${es.kakao-index}")
    private String kakaoIndex;

    @Value("${es.survey-index}")
    private String surveyIndex;

    @Value("${es.share-index}")
    private String shareIndex;

    @Value("${es.mbti-index}")
    private String mbtiIndex;

    @Value("${es.youtuber-index}")
    private String youtuberIndex;

    @Override
    public AnalysisKakaoShareResponseDto analyzeKakaoShareButton() {
        String aggregationName = "share-count";

        SearchRequest request = new SearchRequest(kakaoIndex)
                .source(new SearchSourceBuilder()
                        .size(0)
                        .aggregation(AggregationBuilders.terms(aggregationName)
                                .field("shareResult")
                                .size(2)));

        SearchResponse response = null;
        try {
            response = restHighLevelClient.search(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new RuntimeException();
        }
        Terms termBucket = response.getAggregations().get(aggregationName);
        List<Long> result = new ArrayList<>();
        for (Terms.Bucket bucket : termBucket.getBuckets())
            result.add(bucket.getDocCount());

        return AnalysisKakaoShareResponseDto.builder()
                .result(result)
                .build();
    }

    @Override
    public List<AnalysisServicePlanResponseDto> analyzeServicePlan() {
        String aggregationName = "A-B-test";
        String subAggregationName = "service-plan";

        SearchRequest request = new SearchRequest(surveyIndex)
                .source(new SearchSourceBuilder()
                        .size(0)
                        .aggregation(AggregationBuilders.terms(aggregationName)
                                .field("color.keyword")
                                .size(2)
                                .subAggregation(AggregationBuilders.terms(subAggregationName)
                                        .field("pageNo")
                                        .size(14)
                                        .order(BucketOrder.key(true)))));

        SearchResponse response = null;
        try {
            response = restHighLevelClient.search(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new RuntimeException();
        }
        Terms termBucket = response.getAggregations().get(aggregationName);

        List<AnalysisServicePlanResponseDto> responseDto = new ArrayList<>();
        for (Terms.Bucket bucket : termBucket.getBuckets()) {
            Terms subTermBucket = bucket.getAggregations().get(subAggregationName);
            List<Long> result = new ArrayList<>();
            for (Terms.Bucket subBucket : subTermBucket.getBuckets())
                result.add(subBucket.getDocCount());

            responseDto.add(AnalysisServicePlanResponseDto.builder()
                    .key(bucket.getKeyAsString()).result(result).build());
        }
        return responseDto;
    }

    @Override
    public AnalysisShareResponseDto analyzeShareButton() {
        String aggregationName = "share-count";

        SearchRequest request = new SearchRequest(shareIndex)
                .source(new SearchSourceBuilder()
                        .size(0)
                        .aggregation(AggregationBuilders.terms(aggregationName)
                                .field("sns")
                                .size(5)
                                .order(BucketOrder.key(true))));

        SearchResponse response = null;
        try {
            response = restHighLevelClient.search(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new RuntimeException();
        }
        Terms termBucket = response.getAggregations().get(aggregationName);
        List<Long> result = new ArrayList<>();
        for (Terms.Bucket bucket : termBucket.getBuckets())
            result.add(bucket.getDocCount());

        return AnalysisShareResponseDto.builder()
                .result(result)
                .build();
    }

    @Override
    public AnalysisSurveyTimeResponseDto analyzeSurveyTime() {
        SearchRequest request = new SearchRequest(surveyIndex);
        request.source(new SearchSourceBuilder()
                .size(2147483647)
                .sort(Arrays.asList(
                        SortBuilders.fieldSort("userIpAddress.keyword").order(SortOrder.DESC),
                        SortBuilders.fieldSort("timestamp").order(SortOrder.DESC))));

        SearchResponse response = null;
        try {
            response = restHighLevelClient.search(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }

        long[] totalDiffTime = new long[14];
        long[] totalCount = new long[14];

        SurveyDto prev = null;
        for (SearchHit hit : response.getHits().getHits()) {
            SurveyDto curr = SurveyDto.toSurveyDto(hit);
            if(prev != null && Math.abs(prev.getPageNo()-curr.getPageNo()) == 1) {
                Duration duration = Duration.between(curr.getTimestamp(), prev.getTimestamp());
                totalDiffTime[curr.getPageNo()] += Math.abs(duration.getSeconds());
                totalCount[curr.getPageNo()]++;
            }
            prev = curr;
        }

        List<Double> result = new ArrayList<>();
        for(int i = 0; i < totalDiffTime.length - 1; i++) {
            result.add((double) totalDiffTime[i] / totalCount[i]);
        }

        return AnalysisSurveyTimeResponseDto.builder()
                .result(result).build();
    }

    @Override
    public AnalysisMbtiCategoryResponseDto analyzeMbtiCategory() {
        String aggregationName = "mbti-youtuber";
        Map<String, List<Double>> result = new HashMap<>();
        for (MBTI mbti : MBTI.values()) {
            double[] category = new double[6];
            Arrays.fill(category, 0f);

            SearchRequest aggRequest = new SearchRequest(mbtiIndex);
            aggRequest.source(new SearchSourceBuilder()
                    .query(termQuery("mbti", mbti))
                    .aggregation(AggregationBuilders.terms(aggregationName)
                            .field("youtuber.keyword")
                            .size(2147483647)));

            SearchResponse aggResponse = null;
            try {
                aggResponse = restHighLevelClient.search(aggRequest, RequestOptions.DEFAULT);
            } catch (IOException e) {
                e.printStackTrace();
            }

            Terms terms = aggResponse.getAggregations().get(aggregationName);
            Map<String, Long> youtubers = new HashMap<>();
            for (Terms.Bucket bucket : terms.getBuckets()) {
                youtubers.put(bucket.getKeyAsString(), bucket.getDocCount());
            }

            // 2번째 요청
            SearchRequest topicRequest = new SearchRequest(youtuberIndex);
            topicRequest.source(new SearchSourceBuilder()
                    .query(termsQuery("channel_id", youtubers.keySet())));

            SearchResponse topicResponse = null;
            try {
                topicResponse = restHighLevelClient.search(topicRequest, RequestOptions.DEFAULT);
            } catch (IOException e) {
                e.printStackTrace();
            }

            for (SearchHit hit : topicResponse.getHits().getHits()) {
                boolean[] isContains = new boolean[6];
                Map<String, Object> sourceAsMap = hit.getSourceAsMap();
                for (Object topic : (List<Object>) sourceAsMap.get("topic")) {
                    Map<String, String> topicAsMap = (Map<String, String>) topic;
                    int categoryIndex = TOPIC.findCategory(topicAsMap.get("topic_id")) - 1;
                    if(!isContains[categoryIndex])
                        isContains[categoryIndex] = true;
                }
                for(int i = 0; i < isContains.length; i++) {
                    if(isContains[i])
                        category[i] += youtubers.get(sourceAsMap.get("channel_id").toString());
                }
            }

            // 3번째 요청
            SearchRequest notExistsRequest = new SearchRequest(mbtiIndex);
            notExistsRequest.source(new SearchSourceBuilder()
                    .query(boolQuery()
                            .must(termQuery("mbti", mbti))
                            .mustNot(existsQuery("youtuber"))));

            SearchResponse notExistsResponse = null;
            try {
                notExistsResponse = restHighLevelClient.search(notExistsRequest, RequestOptions.DEFAULT);
            } catch (IOException e) {
                e.printStackTrace();
            }
            double requestPerson = aggResponse.getHits().getTotalHits().value - notExistsResponse.getHits().getTotalHits().value;

            for (int i = 0; i < category.length; i++) {
                category[i] = category[i] * (requestPerson / aggResponse.getHits().getTotalHits().value) * 100;
            }
            result.put(mbti.toString(), Arrays.stream(category).boxed().collect(Collectors.toList()));
        }
        return AnalysisMbtiCategoryResponseDto.builder()
                .result(result)
                .build();
    }

    private SearchResponse requestQuery(SearchSourceBuilder searchSourceBuilder) {
        return null;
    }
}
