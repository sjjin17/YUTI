package com.yuti.analytics.global.exception;

import lombok.NoArgsConstructor;


@NoArgsConstructor
public class LoginFailureException extends RuntimeException{
    public LoginFailureException(String message) {
        super(message);
    }

}
