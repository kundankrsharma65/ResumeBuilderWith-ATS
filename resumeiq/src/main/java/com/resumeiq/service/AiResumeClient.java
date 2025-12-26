// FILE: src/main/java/com/resumeiq/service/AiResumeClient.java
package com.resumeiq.service;

import com.resumeiq.dto.AiAnalysisResponse;
import com.resumeiq.dto.AiResumeGenerateResponse;
import com.resumeiq.dto.ResumeCreateRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class AiResumeClient {

    private final RestTemplate restTemplate;

    @Value("${ai.service.base-url}")
    private String aiBaseUrl;

    public AiResumeClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public AiAnalysisResponse analyzeResume(String resumeText) {

        Map<String, String> request =
                Map.of("resumeText", resumeText);

        return restTemplate.postForObject(
                aiBaseUrl + "/analyze",
                request,
                AiAnalysisResponse.class
        );
    }

    public AiResumeGenerateResponse generateResume(
            ResumeCreateRequest request) {

        return restTemplate.postForObject(
                aiBaseUrl + "/generate",
                request,
                AiResumeGenerateResponse.class
        );
    }
}
