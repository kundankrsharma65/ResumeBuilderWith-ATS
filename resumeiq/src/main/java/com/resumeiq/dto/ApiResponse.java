// FILE: src/main/java/com/resumeiq/dto/ApiResponse.java
package com.resumeiq.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ApiResponse {

    private String message;
    private boolean success;

    // backward compatibility (GlobalExceptionHandler)
    public ApiResponse(String message) {
        this.message = message;
        this.success = false;
    }
}
