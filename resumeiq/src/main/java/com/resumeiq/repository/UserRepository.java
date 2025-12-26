// FILE: src/main/java/com/resumeiq/repository/UserRepository.java
package com.resumeiq.repository;

import com.resumeiq.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if email already exists.
     */
    boolean existsByEmail(String email);

    /**
     * Used during login to ensure email is verified.
     */
    Optional<User> findByEmailAndEmailVerifiedTrue(String email);
}
