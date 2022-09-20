package com.yuti.mainserver.global.api;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommonResponse<T> extends BasicResponse {

    private boolean success;
    private T data;

    public CommonResponse(T data) {
        this.success = true;
        this.data = data;
    }
}
