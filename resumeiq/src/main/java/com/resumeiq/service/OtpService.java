package com.resumeiq.service;

import com.resumeiq.config.OtpConfig;
import com.resumeiq.entity.Otp;
import com.resumeiq.exception.InvalidOtpException;
import com.resumeiq.repository.OtpRepository;
import com.resumeiq.util.OtpGenerator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    public OtpService(OtpRepository otpRepository,
                      EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    public void sendOtp(String email) {

        validateResendDelay(email);

        String otpValue = OtpGenerator.generateOtp();

        Otp otp = Otp.builder()
                .email(email)
                .otp(otpValue)
                .expiryTime(LocalDateTime.now()
                        .plus(OtpConfig.OTP_EXPIRY))
                .used(false)
                .build();

        otpRepository.save(otp);
        emailService.sendOtpEmail(email, otpValue);
    }

    public void verifyOtp(String email, String otpValue) {

        Otp otp = otpRepository
                .findTopByEmailOrderByExpiryTimeDesc(email)
                .orElseThrow(() ->
                        new InvalidOtpException("OTP not found"));

        if (otp.isUsed()) {
            throw new InvalidOtpException("OTP already used");
        }

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new InvalidOtpException("OTP expired");
        }

        if (!otp.getOtp().equals(otpValue)) {
            throw new InvalidOtpException("Invalid OTP");
        }

        otp.setUsed(true);
        otpRepository.save(otp);
    }

    private void validateResendDelay(String email) {

        otpRepository
                .findTopByEmailOrderByExpiryTimeDesc(email)
                .ifPresent(lastOtp -> {

                    LocalDateTime allowedTime =
                            lastOtp.getExpiryTime()
                                    .minus(OtpConfig.OTP_EXPIRY)
                                    .plus(OtpConfig.OTP_RESEND_DELAY);

                    if (allowedTime.isAfter(LocalDateTime.now())) {
                        throw new InvalidOtpException(
                                "Please wait before requesting a new OTP");
                    }
                });
    }
}
