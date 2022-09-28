package com.yuti.analytics.domain.accounts.repository;

import com.yuti.analytics.domain.accounts.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
