package com.yuti.analytics.domain.accounts.service;

import com.yuti.analytics.domain.accounts.domain.User;

public interface UserService {

    String join(User user);
    User findById(String id);
    Boolean login(String id, String rawPw);

}
