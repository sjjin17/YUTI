package com.yuti.analytics.domain.analysis.service;

import com.yuti.analytics.domain.analysis.dto.AnalysisKakaoShareResponseDto;
import com.yuti.analytics.domain.analysis.dto.AnalysisServicePlanResponseDto;
import com.yuti.analytics.domain.analysis.dto.AnalysisShareResponseDto;

import java.util.List;

public interface AnalysisService {

    AnalysisKakaoShareResponseDto analyzeKakaoShareButton();
    List<AnalysisServicePlanResponseDto> analyzeServicePlan();
    AnalysisShareResponseDto analyzeShareButton();
}
