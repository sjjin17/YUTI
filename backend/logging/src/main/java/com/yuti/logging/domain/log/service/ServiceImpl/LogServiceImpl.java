package com.yuti.logging.domain.log.service.ServiceImpl;

import com.yuti.logging.domain.log.dto.SurveyLogDto;
import com.yuti.logging.domain.log.dto.SurveyRequestDto;
import com.yuti.logging.domain.log.service.LogService;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class LogServiceImpl implements LogService {

    @Override
    public void clickAnswerButton(SurveyRequestDto surveyRequestDto, HttpServletRequest httpServletRequest) {
        SurveyLogDto surveyLogDto = SurveyLogDto.toLogDto(surveyRequestDto, httpServletRequest);

        /**
         * surveyLogDto를 kafka로 넘겨주세요 :)
         */
    }

}
