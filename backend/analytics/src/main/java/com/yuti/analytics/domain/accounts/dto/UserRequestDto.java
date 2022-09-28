package com.yuti.analytics.domain.accounts.dto;

import com.yuti.analytics.domain.accounts.domain.User;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Getter
public class UserRequestDto {
    @NotEmpty
    private String id;
    @NotEmpty
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
    private String password;

    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .id(this.id)
                .password(passwordEncoder.encode(this.password))
                .build();

    }
}
