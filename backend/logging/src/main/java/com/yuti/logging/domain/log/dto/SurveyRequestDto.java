package com.yuti.logging.domain.log.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class SurveyRequestDto {

    @NotEmpty
    private String pageNo;
    @NotNull
    private long timeDiff;
    @NotEmpty
    private String answer;

}
