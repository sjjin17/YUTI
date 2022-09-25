package com.yuti.mainserver.domain.mbti.api;

import com.yuti.mainserver.domain.mbti.dto.MbtiResultRequestDto;
import com.yuti.mainserver.domain.mbti.service.MbtiService;
import com.yuti.mainserver.global.api.BasicResponse;
import com.yuti.mainserver.global.api.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class MbtiApiController {

    private final MbtiService mbtiService;

    @PostMapping("/api/v1/mbti")
    public ResponseEntity<? extends BasicResponse> recommendYoutubers(@Valid @RequestBody MbtiResultRequestDto mbtiResultRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(mbtiService.recommendYoutubers(mbtiResultRequestDto)));
    }
}
