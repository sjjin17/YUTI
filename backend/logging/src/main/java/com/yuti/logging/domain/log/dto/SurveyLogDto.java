package com.yuti.logging.domain.log.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.servlet.http.HttpServletRequest;

@Getter
@NoArgsConstructor
public class SurveyLogDto {

    private String pageNo;
    private long timeDiff;
    private String answer;
    private String ip;

    @Builder
    public SurveyLogDto(String pageNo, long timeDiff, String answer, String ip) {
        this.pageNo = pageNo;
        this.timeDiff = timeDiff;
        this.answer = answer;
        this.ip = ip;
    }

    public static SurveyLogDto toLogDto(SurveyRequestDto surveyRequestDto, HttpServletRequest httpServletRequest) {
        return SurveyLogDto.builder()
                .pageNo(surveyRequestDto.getPageNo())
                .timeDiff(surveyRequestDto.getTimeDiff())
                .answer(surveyRequestDto.getAnswer())
                .ip(httpServletRequest.getHeader("x-forwarded-for"))
                .build();
    }
}
