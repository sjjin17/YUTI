package com.yuti.mainserver.domain.mbti.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@NoArgsConstructor
public class MbtiResultRequestDto {

    @NotEmpty
    private String mbti;

    private String youtuber;

    @Builder
    public MbtiResultRequestDto(String mbti, String youtuber) {
        this.mbti = mbti;
        this.youtuber = youtuber;
    }
}
