package com.yuti.logging.pipeline.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ShareResultVO {

    private String timestamp;
    private String userAgent;
    private String userIpAddress;
    private String shareResult;
}
