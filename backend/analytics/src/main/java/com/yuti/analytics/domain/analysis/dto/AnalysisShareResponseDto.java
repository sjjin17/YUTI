package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AnalysisShareResponseDto {

    private List<Long> result;

    @Builder
    public AnalysisShareResponseDto(List<Long> result) {
        this.result = result;
    }
}
