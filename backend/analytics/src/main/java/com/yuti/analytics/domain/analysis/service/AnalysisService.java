package com.yuti.analytics.domain.analysis.service;

import com.yuti.analytics.domain.analysis.dto.*;

import java.util.List;

public interface AnalysisService {

    AnalysisKakaoShareResponseDto analyzeKakaoShareButton();
    List<AnalysisServicePlanResponseDto> analyzeServicePlan();
    AnalysisShareResponseDto analyzeShareButton();
    AnalysisSurveyTimeResponseDto analyzeSurveyTime();
    AnalysisMbtiCategoryResponseDto analyzeMbtiCategory();
}
