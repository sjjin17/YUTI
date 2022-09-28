package com.yuti.analytics.domain.accounts.api;


import com.yuti.analytics.domain.accounts.dto.UserRequestDto;
import com.yuti.analytics.domain.accounts.service.UserService;
import com.yuti.analytics.global.api.BasicResponse;
import com.yuti.analytics.global.api.CommonResponse;
import com.yuti.analytics.global.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.UnsupportedEncodingException;


@RestController
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;
    private final JWTUtil jwtUtil;

    @PostMapping("/analytics/v1/accounts/signup")
    public ResponseEntity<? extends BasicResponse> signup(@RequestBody @Valid UserRequestDto userRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.join(userRequestDto)));
    }


    @PostMapping("/analytics/v1/accounts/login")
    public ResponseEntity<? extends BasicResponse> login(@RequestBody @Valid UserRequestDto userRequestDto) throws UnsupportedEncodingException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.login(userRequestDto)));

    }

    @PostMapping("/analytics/v1/accounts/logout")
    public ResponseEntity<? extends BasicResponse> logout(@RequestBody @Valid UserRequestDto userRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.logout(userRequestDto)));
    }




}
