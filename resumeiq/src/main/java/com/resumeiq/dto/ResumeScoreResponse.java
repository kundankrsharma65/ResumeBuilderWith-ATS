// FILE: src/main/java/com/resumeiq/dto/ResumeScoreResponse.java
package com.resumeiq.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Response returned after ATS / AI analysis
 */
@Getter
@AllArgsConstructor
public class ResumeScoreResponse {

    private int score;
    private String message;
}
