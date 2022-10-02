package com.yuti.analytics.domain.analysis.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AnalysisKakaoShareResponseDto {

    private List<Long> shareResult;

    @Builder
    public AnalysisKakaoShareResponseDto(List<Long> shareResult) {
        this.shareResult = shareResult;
    }
}
