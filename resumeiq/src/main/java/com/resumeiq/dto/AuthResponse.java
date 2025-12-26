// FILE: src/main/java/com/resumeiq/dto/AuthResponse.java
package com.resumeiq.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private String accessToken;
    private String tokenType;
    private long expiresIn;
}
