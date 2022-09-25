package com.yuti.mainserver.global.api;

import com.yuti.mainserver.global.exception.CustomException;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ErrorResponse extends BasicResponse {

    private boolean success;
    private String message;

    public ErrorResponse(String message) {
        success = false;
        this.message = message;
    }

    public static ResponseEntity<ErrorResponse> error(CustomException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(e.getMessage()));
    }
}
