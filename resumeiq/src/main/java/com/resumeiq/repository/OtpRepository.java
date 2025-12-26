// FILE: src/main/java/com/resumeiq/repository/OtpRepository.java
package com.resumeiq.repository;

import com.resumeiq.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findTopByEmailOrderByExpiryTimeDesc(String email);

    @Modifying
    @Query("DELETE FROM Otp o WHERE o.expiryTime < :now")
    void deleteExpiredOtps(LocalDateTime now);
}
