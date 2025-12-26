// FILE: src/main/java/com/resumeiq/controller/AuthController.java
package com.resumeiq.controller;

import com.resumeiq.dto.*;
import com.resumeiq.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(
            @RequestBody @Valid RegisterRequest request) {

        authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.builder()
                        .success(true)
                        .message("OTP sent to registered email")
                        .build());
    }

    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse> verifyEmail(
            @RequestBody @Valid OtpVerifyRequest request) {

        authService.verifyEmailOtp(request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Email verified successfully")
                        .build());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody @Valid LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(
            @RequestParam String email) {

        authService.sendForgotPasswordOtp(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("OTP sent for password reset")
                        .build());
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestBody @Valid ForgotPasswordRequest request) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Password reset successful")
                        .build());
    }
}
