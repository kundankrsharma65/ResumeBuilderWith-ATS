// FILE: src/main/java/com/resumeiq/dto/ResumeCreateRequest.java
package com.resumeiq.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResumeCreateRequest {

    @NotBlank(message = "Target role is required")
    private String targetRole;

    @NotBlank(message = "Experience is required")
    private String experience;

    @NotEmpty(message = "Skills list cannot be empty")
    private List<String> skills;

    private List<String> projects;
}
