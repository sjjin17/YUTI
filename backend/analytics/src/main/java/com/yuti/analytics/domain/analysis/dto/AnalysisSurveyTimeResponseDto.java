package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AnalysisSurveyTimeResponseDto {

    private List<Double> result;

    @Builder
    public AnalysisSurveyTimeResponseDto(List<Double> result) {
        this.result = result;
    }
}
