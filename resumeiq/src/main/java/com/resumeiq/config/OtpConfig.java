package com.resumeiq.config;

import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class OtpConfig {

    public static final Duration OTP_EXPIRY = Duration.ofMinutes(5);
    public static final Duration OTP_RESEND_DELAY = Duration.ofSeconds(60);
}
