package com.yuti.analytics.global.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class LogoutFailureException extends RuntimeException{
    public LogoutFailureException(String message) {
        super(message);
    }
}
