package com.yuti.logging.domain.log.api;

import com.yuti.logging.domain.log.dto.SurveyRequestDto;
import com.yuti.logging.domain.log.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class LogApiController {

    private final LogService logService;

    @PostMapping("/api/v1/logs/survey")
    public ResponseEntity clickAnswerButton(@Valid @RequestBody SurveyRequestDto surveyRequestDto, HttpServletRequest httpServletRequest) {
        logService.clickAnswerButton(surveyRequestDto, httpServletRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
