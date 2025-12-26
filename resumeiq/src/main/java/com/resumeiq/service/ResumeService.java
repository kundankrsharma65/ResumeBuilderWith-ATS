// FILE: src/main/java/com/resumeiq/service/ResumeService.java
package com.resumeiq.service;

import com.resumeiq.dto.AiAnalysisResponse;
import com.resumeiq.dto.AiResumeGenerateResponse;
import com.resumeiq.dto.ResumeCreateRequest;
import com.resumeiq.dto.ResumeScoreResponse;
import com.resumeiq.entity.Resume;
import com.resumeiq.repository.ResumeRepository;
import com.resumeiq.util.ResumeParser;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final AiResumeClient aiResumeClient;

    public ResumeService(ResumeRepository resumeRepository,
                         AiResumeClient aiResumeClient) {
        this.resumeRepository = resumeRepository;
        this.aiResumeClient = aiResumeClient;
    }

    public ResumeScoreResponse uploadAndAnalyze(
            String email, MultipartFile file) {

        String extractedText = ResumeParser.parse(file);

        AiAnalysisResponse ai =
                aiResumeClient.analyzeResume(extractedText);

        Resume resume = Resume.builder()
                .email(email)
                .fileName(file.getOriginalFilename())
                .extractedText(extractedText)
                .atsScore(ai.getAtsScore())
                .aiScore(ai.getAiScore())
                .primaryRole(ai.getPrimaryRole())
                .missingSkills(String.join(", ", ai.getMissingSkills()))
                .improvementSuggestions(
                        String.join(" | ", ai.getImprovementSuggestions()))
                .build();

        resumeRepository.save(resume);

        return new ResumeScoreResponse(
                ai.getAtsScore(),
                "AI Analysis completed for role: " + ai.getPrimaryRole()
        );
    }

    public AiResumeGenerateResponse createWithAi(
            String email, ResumeCreateRequest request) {

        AiResumeGenerateResponse ai =
                aiResumeClient.generateResume(request);

        Resume resume = Resume.builder()
                .email(email)
                .fileName("AI_Generated_Resume")
                .extractedText(ai.getResumeText())
                .atsScore(ai.getAtsScore())
                .aiScore(ai.getAiScore())
                .primaryRole(request.getTargetRole())
                .improvementSuggestions(
                        String.join(" | ", ai.getSuggestions()))
                .build();

        resumeRepository.save(resume);
        return ai;
    }

    public ResumeScoreResponse improveWithAi(String email, Long id) {

        Resume resume = resumeRepository
                .findByIdAndEmail(id, email)
                .orElseThrow(() ->
                        new IllegalStateException("Resume not found"));

        AiAnalysisResponse ai =
                aiResumeClient.analyzeResume(resume.getExtractedText());

        resume.setAtsScore(ai.getAtsScore());
        resume.setAiScore(ai.getAiScore());
        resume.setPrimaryRole(ai.getPrimaryRole());
        resume.setMissingSkills(
                String.join(", ", ai.getMissingSkills()));
        resume.setImprovementSuggestions(
                String.join(" | ", ai.getImprovementSuggestions()));

        resumeRepository.save(resume);

        return new ResumeScoreResponse(
                ai.getAtsScore(),
                "Resume improved for role: " + ai.getPrimaryRole()
        );
    }

    public List<Resume> getUserHistory(String email) {
        return resumeRepository.findByEmailOrderByCreatedAtDesc(email);
    }
}
