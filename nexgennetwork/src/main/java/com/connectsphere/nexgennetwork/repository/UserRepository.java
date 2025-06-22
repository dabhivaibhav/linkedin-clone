package com.connectsphere.nexgennetwork.repository;

import com.connectsphere.nexgennetwork.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
