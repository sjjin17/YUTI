package com.yuti.analytics.domain.analysis.service.impl;

import com.yuti.analytics.domain.analysis.dto.AnalysisKakaoShareResponseDto;
import com.yuti.analytics.domain.analysis.dto.AnalysisServicePlanResponseDto;
import com.yuti.analytics.domain.analysis.dto.AnalysisShareResponseDto;
import com.yuti.analytics.domain.analysis.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.BucketOrder;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        List<Long> shareResult = new ArrayList<>();
        for (Terms.Bucket bucket : termBucket.getBuckets())
            shareResult.add(bucket.getDocCount());

        return AnalysisKakaoShareResponseDto.builder()
                .shareResult(shareResult)
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
                                .size(5)));

        SearchResponse response = null;
        try {
            response = restHighLevelClient.search(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new RuntimeException();
        }
        Terms termBucket = response.getAggregations().get(aggregationName);
        Map<String, Long> result = new HashMap<>();
        for (Terms.Bucket bucket : termBucket.getBuckets())
            result.put(bucket.getKeyAsString(), bucket.getDocCount());

        return AnalysisShareResponseDto.builder()
                .result(result)
                .build();
    }
}
