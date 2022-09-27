package com.yuti.analytics.domain.accounts.service;

import com.yuti.analytics.domain.accounts.domain.User;
import com.yuti.analytics.domain.accounts.dto.UserRequestDto;

import java.io.UnsupportedEncodingException;

public interface UserService {

    String join(UserRequestDto userRequestDto);
    User findById(String id);
    String login(UserRequestDto userRequestDto) throws UnsupportedEncodingException;

}
