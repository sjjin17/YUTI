package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AnalysisKakaoShareResponseDto {

    private List<Long> result;

    @Builder
    public AnalysisKakaoShareResponseDto(List<Long> result) {
        this.result = result;
    }
}
