// FILE: src/main/java/com/resumeiq/entity/Resume.java
package com.resumeiq.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "resumes",
        indexes = {
                @Index(name = "idx_resume_email", columnList = "email")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String fileName;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String extractedText;

    @Column(nullable = false)
    private int atsScore;

    @Column(nullable = false)
    private int aiScore;

    @Column(nullable = false)
    private String primaryRole;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String missingSkills;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String improvementSuggestions;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
