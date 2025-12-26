package com.resumeiq.service;

import com.resumeiq.dto.*;
import com.resumeiq.entity.Role;
import com.resumeiq.entity.User;
import com.resumeiq.exception.UserNotFoundException;
import com.resumeiq.repository.UserRepository;
import com.resumeiq.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil,
                       OtpService otpService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
    }

    public void register(RegisterRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .enabled(true)
                .emailVerified(false)
                .build();

        userRepository.save(user);
        otpService.sendOtp(user.getEmail());
    }

    public void verifyEmailOtp(OtpVerifyRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        otpService.verifyOtp(request.getEmail(), request.getOtp());

        user.setEmailVerified(true);
        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmailAndEmailVerifiedTrue(request.getEmail())
                .orElseThrow(() ->
                        new IllegalStateException("Email not verified"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        return AuthResponse.builder()
                .accessToken(jwtUtil.generateToken(user))
                .tokenType("Bearer")
                .expiresIn(jwtUtil.getExpirationSeconds())
                .build();
    }

    public void sendForgotPasswordOtp(String email) {

        if (!userRepository.existsByEmail(email)) {
            throw new UserNotFoundException("User not found");
        }

        otpService.sendOtp(email);
    }

    public void resetPassword(ForgotPasswordRequest request) {

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        otpService.verifyOtp(request.getEmail(), request.getOtp());

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);
    }
}
