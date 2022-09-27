package com.yuti.analytics.domain.accounts.service.serviceImpl;

import com.yuti.analytics.domain.accounts.domain.User;
import com.yuti.analytics.domain.accounts.dto.UserRequestDto;
import com.yuti.analytics.domain.accounts.repository.UserRepository;
import com.yuti.analytics.domain.accounts.service.UserService;
import com.yuti.analytics.global.exception.LoginFailureException;
import com.yuti.analytics.global.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.io.UnsupportedEncodingException;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    @Override
    public String join(UserRequestDto userRequestDto) {
        User user = userRequestDto.toEntity(passwordEncoder);
        return userRepository.save(user).getId();

    }

    @Override
    @Transactional(readOnly = true)
    public User findById(String id) {
        if (userRepository.existsById(id))
            return userRepository.findById(id).get();
        else
            throw new EntityNotFoundException();
    }

    @Override
    public String login(UserRequestDto userRequestDto) throws UnsupportedEncodingException {
        if (userRepository.existsById(userRequestDto.getId())) {
            User user = userRepository.findById(userRequestDto.getId()).get();
            if (userRequestDto.getId().equals(user.getId()) && passwordEncoder.matches(userRequestDto.getPassword(), user.getPassword())) {
                user.setToken(true);
                return jwtUtil.createToken("id", user.getId());
            } else {
                throw new LoginFailureException();
            }
        } else {
            throw new EntityNotFoundException();
        }


    }

    @Override
    public String logout(UserRequestDto userRequestDto) {

        if (userRepository.existsById(userRequestDto.getId())) {
            User user = userRepository.findById(userRequestDto.getId()).get();
            user.setToken(false);
            return user.getId();

        } else
            throw new EntityNotFoundException();
    }



}




