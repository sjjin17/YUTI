package com.yuti.analytics.domain.accounts.api;

import com.yuti.analytics.domain.accounts.domain.User;
import com.yuti.analytics.domain.accounts.dto.UserLoginRequestDto;
import com.yuti.analytics.domain.accounts.dto.UserRegisterRequestDto;
import com.yuti.analytics.domain.accounts.dto.UserRegisterResponseDto;
import com.yuti.analytics.domain.accounts.service.UserService;
import com.yuti.analytics.global.api.BasicResponse;
import com.yuti.analytics.global.api.CommonResponse;
import com.yuti.analytics.global.exception.LoginFailureException;
import com.yuti.analytics.global.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;


@RestController
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;
    private final JWTUtil jwtUtil;

    @PostMapping("/analytics/v1/accounts/signup")
    public ResponseEntity<? extends BasicResponse> signup(@RequestBody UserRegisterRequestDto userRegisterRequestDto) {
        User user = User.builder()
                .id(userRegisterRequestDto.getId())
                .password(userRegisterRequestDto.getPassword())
                .build();
        String id = userService.join(user);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(new UserRegisterResponseDto(id)));
    }


    @PostMapping("/analytics/v1/accounts/login")
    public ResponseEntity<? extends BasicResponse> login(@RequestBody UserLoginRequestDto userLoginRequestDto) throws UnsupportedEncodingException {
        User user = userService.findById(userLoginRequestDto.getId());

        if (!userService.login(userLoginRequestDto.getId(), userLoginRequestDto.getPassword())) {
            throw new LoginFailureException();
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(jwtUtil.createToken("id", user.getId())));

    }




}
