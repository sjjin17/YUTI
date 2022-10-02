package com.yuti.logging.pipeline.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ShareButtonVO {

    private String timestamp;
    private String userAgent;
    private String userIpAddress;
    private String sns;
}
