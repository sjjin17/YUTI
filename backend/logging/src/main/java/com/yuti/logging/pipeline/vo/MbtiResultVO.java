package com.yuti.logging.pipeline.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MbtiResultVO {

    private String timestamp;
    private String mbti;
    private List<String> youtuber;
    private String userAgent;
    private String userIpAddress;

}
