package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class AnalysisShareResponseDto {

    private Map<String, Long> result;

    @Builder
    public AnalysisShareResponseDto(Map<String, Long> result) {
        this.result = result;
    }
}
