package com.yuti.analytics.domain.accounts.service.serviceImpl;

import com.yuti.analytics.domain.accounts.domain.User;
import com.yuti.analytics.domain.accounts.repository.UserRepository;
import com.yuti.analytics.domain.accounts.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String join(User user) {
        String id = user.getId();
        String password = user.getPassword();
        User member = User.builder()
                .id(id)
                .password(passwordEncoder.encode(password))
                .build();
        userRepository.save(member);
        return user.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public Boolean login(String id, String password) {
        User user = userRepository.findById(id);
        if (id.equals(user.getId()) && passwordEncoder.matches(password, user.getPassword())) {
            userRepository.updateStauts(user);
            return true;
        } else{
            return false;
        }

    }


}
