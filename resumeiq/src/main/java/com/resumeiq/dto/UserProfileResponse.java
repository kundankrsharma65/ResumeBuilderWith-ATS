// FILE: src/main/java/com/resumeiq/dto/UserProfileResponse.java
package com.resumeiq.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private boolean emailVerified;
}
