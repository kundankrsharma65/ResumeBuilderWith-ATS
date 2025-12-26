package com.resumeiq.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final String SUBJECT =
            "ResumeIQ - One Time Password";

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(SUBJECT);
        message.setText("""
                Hello,

                Your OTP is: %s

                This OTP is valid for 5 minutes.
                Please do not share it with anyone.

                Regards,
                ResumeIQ Team
                """.formatted(otp));

        mailSender.send(message);
    }
}
