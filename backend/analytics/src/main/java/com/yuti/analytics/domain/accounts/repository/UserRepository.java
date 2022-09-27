package com.yuti.analytics.domain.accounts.repository;

import com.yuti.analytics.domain.accounts.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User, String> {

}
