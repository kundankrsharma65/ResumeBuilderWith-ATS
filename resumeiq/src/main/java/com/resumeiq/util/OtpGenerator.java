package com.resumeiq.util;

import java.security.SecureRandom;

/**
 * Utility class for generating secure numeric OTPs.
 */
public final class OtpGenerator {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final int OTP_LENGTH = 6;
    private static final int OTP_BOUND = 1_000_000;

    private OtpGenerator() {
        // Prevent instantiation
    }

    /**
     * Generates a 6-digit numeric OTP.
     *
     * @return OTP as String
     */
    public static String generateOtp() {
        int otp = SECURE_RANDOM.nextInt(OTP_BOUND);
        return String.format("%0" + OTP_LENGTH + "d", otp);
    }
}
