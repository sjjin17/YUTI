package com.yuti.logging.pipeline.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MbtiResultVO {

    private String timestamp;
    private String mbti;
    private String youtuber;
    private String userAgent;
    private String userIpAddress;

}
