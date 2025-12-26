// FILE: src/main/java/com/resumeiq/repository/TemplateRepository.java
package com.resumeiq.repository;

import com.resumeiq.entity.Template;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TemplateRepository extends JpaRepository<Template, Long> {
    List<Template> findByAtsFriendlyTrue();
}
