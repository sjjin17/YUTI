package com.yuti.analytics.domain.analysis.api;

import com.yuti.analytics.domain.analysis.service.AnalysisService;
import com.yuti.analytics.global.api.BasicResponse;
import com.yuti.analytics.global.api.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AnalysisApiController {

    private final AnalysisService analysisService;

    @GetMapping("/analytics/v1/analysis/kakao")
    public ResponseEntity<? extends BasicResponse> analyzeKakaoShareButton() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(analysisService.analyzeKakaoShareButton()));
    }

    @GetMapping("/analytics/v1/analysis/plan")
    public ResponseEntity<? extends BasicResponse> analyzeServicePlan() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(analysisService.analyzeServicePlan()));
    }

    @GetMapping("/analytics/v1/analysis/share")
    public ResponseEntity<? extends BasicResponse> analyzeShareButton() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(analysisService.analyzeShareButton()));
    }

    @GetMapping("/analytics/v1/analysis/category")
    public ResponseEntity<? extends BasicResponse> analyzeMbtiCategory() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(analysisService.analyzeMbtiCategory()));
    }
}
