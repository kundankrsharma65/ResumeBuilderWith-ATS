// FILE: src/main/java/com/resumeiq/controller/OtpController.java
package com.resumeiq.controller;

import com.resumeiq.dto.ApiResponse;
import com.resumeiq.service.OtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/resend")
    public ResponseEntity<ApiResponse> resendOtp(
            @RequestParam String email) {

        otpService.sendOtp(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("OTP resent successfully")
                        .build());
    }
}
