package com.yuti.analytics.domain.accounts.domain;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Collection;


@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class User {
    @Id @Column(name="user_id")
    private String id;
    private String password;
    @Column(name="is_token")
    private boolean isToken;

    @Builder
    public User(String id, String password) {
        this.id = id;
        this.password = password;
        this.isToken = false;

    }

    public void setToken(boolean isToken) {
        this.isToken = isToken;
    }



}
