package com.yuti.logging.domain.log.api;

import com.yuti.logging.domain.log.Service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class LogApiController {

    private final LogService logService;

    @PostMapping("/api/v1/logs/visit")
    public ResponseEntity answerTheQuestion(HttpServletRequest httpServletRequest) {
        System.out.println("httpServletRequest.getHeader(\"x-forwarded-for\") = " + httpServletRequest.getHeader("x-forwarded-for"));
        System.out.println("httpServletRequest.getHeader(\"x-original-forwarded-for\") = " + httpServletRequest.getHeader("x-original-forwarded-for"));
        System.out.println("httpServletRequest = " + httpServletRequest.getRemoteAddr());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
