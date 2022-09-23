package com.yuti.logging.domain.log.service;

import com.yuti.logging.domain.log.dto.SurveyRequestDto;

import javax.servlet.http.HttpServletRequest;

public interface LogService {

    void clickAnswerButton(SurveyRequestDto surveyRequestDto, HttpServletRequest httpServletRequest);
}
