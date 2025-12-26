package com.resumeiq.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class ResumeParser {

    public static String parse(MultipartFile file) {
        try {
            return new String(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse resume");
        }
    }
}
