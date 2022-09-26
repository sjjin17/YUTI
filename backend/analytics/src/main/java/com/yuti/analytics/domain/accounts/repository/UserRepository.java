package com.yuti.analytics.domain.accounts.repository;

import com.yuti.analytics.domain.accounts.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(User user) {
        em.persist(user);
    }

    public User findById(String id) {
        return em.find(User.class, id);
    }

    public void updateStauts(User user) {
        user.setToken(true);

    }
}
