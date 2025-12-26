// FILE: src/main/java/com/resumeiq/repository/ResumeRepository.java
package com.resumeiq.repository;

import com.resumeiq.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByEmailOrderByCreatedAtDesc(String email);
    Optional<Resume> findByIdAndEmail(Long id, String email);
}
