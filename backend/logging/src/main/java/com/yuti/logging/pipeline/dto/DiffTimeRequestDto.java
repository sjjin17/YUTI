package com.yuti.logging.pipeline.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DiffTimeRequestDto {

    private Integer pageNo;
    private String color;
    private Character answer;
    private Date diffTime;
}
