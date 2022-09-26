package com.yuti.mainserver.domain.mbti.api;

import com.yuti.mainserver.domain.mbti.service.MbtiService;
import com.yuti.mainserver.global.api.BasicResponse;
import com.yuti.mainserver.global.api.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class MbtiApiController {

    private final MbtiService mbtiService;

    @GetMapping
            ("/api/v1/mbti/{mbti}")
    public ResponseEntity<? extends BasicResponse> recommendYoutubers(@Valid @PathVariable String mbti) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(mbtiService.recommendYoutubers(mbti)));
    }
}
