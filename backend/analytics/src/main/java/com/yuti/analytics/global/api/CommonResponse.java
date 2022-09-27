package com.yuti.analytics.global.api;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommonResponse<T> extends BasicResponse {
    private boolean success;
    private T data;
    private int status;

    public CommonResponse(T data) {
        this.success = true;
        this.data = data;
        this.status = 200;
    }




}
