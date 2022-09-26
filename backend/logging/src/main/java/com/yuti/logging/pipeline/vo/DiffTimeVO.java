package com.yuti.logging.pipeline.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DiffTimeVO {
    private Integer pageNo;
    private String color;
    private Character answer;
    private String diffTime;
    private String timestamp;
    private String userAgent;
    private String userIpAddress;
}
