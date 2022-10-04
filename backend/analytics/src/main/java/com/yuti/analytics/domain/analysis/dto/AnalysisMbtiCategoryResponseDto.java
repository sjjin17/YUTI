package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class AnalysisMbtiCategoryResponseDto {

    private Map<String, List<Double>> result;

    @Builder
    public AnalysisMbtiCategoryResponseDto(Map<String, List<Double>> result) {
        this.result = result;
    }
}
