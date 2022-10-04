package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;
import org.elasticsearch.search.SearchHit;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Getter
public class SurveyDto {

    private String userIpAddress;
    private int pageNo;
    private LocalDateTime timestamp;

    @Builder
    public SurveyDto(String userIpAddress, int pageNo, LocalDateTime timestamp) {
        this.userIpAddress = userIpAddress;
        this.pageNo = pageNo;
        this.timestamp = timestamp;
    }

    public static SurveyDto toSurveyDto(SearchHit hit) {
        String date = hit.getSourceAsMap().get("timestamp").toString();
        if(date.contains(".")) date = date.split("\\.")[0];
        return SurveyDto.builder()
                .userIpAddress(hit.getSourceAsMap().get("userIpAddress").toString())
                .pageNo(Integer.parseInt(hit.getSourceAsMap().get("pageNo").toString()))
                .timestamp(LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")))
                .build();
    }

}
