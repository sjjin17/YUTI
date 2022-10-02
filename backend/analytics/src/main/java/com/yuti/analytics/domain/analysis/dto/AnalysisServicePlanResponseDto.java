package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AnalysisServicePlanResponseDto {

    private String key;
    private List<Long> result;

    @Builder
    public AnalysisServicePlanResponseDto(String key, List<Long> result) {
        this.key = key;
        this.result = result;
    }
}
