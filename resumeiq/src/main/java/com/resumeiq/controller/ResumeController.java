// FILE: src/main/java/com/resumeiq/controller/ResumeController.java
package com.resumeiq.controller;

import com.resumeiq.dto.AiResumeGenerateResponse;
import com.resumeiq.dto.ResumeCreateRequest;
import com.resumeiq.dto.ResumeScoreResponse;
import com.resumeiq.entity.Resume;
import com.resumeiq.service.ResumeService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ResumeScoreResponse> uploadResume(
            Authentication auth,
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                resumeService.uploadAndAnalyze(
                        auth.getName(), file)
        );
    }

    @PostMapping("/create")
    public ResponseEntity<AiResumeGenerateResponse> createResume(
            Authentication auth,
            @RequestBody ResumeCreateRequest request) {

        return ResponseEntity.ok(
                resumeService.createWithAi(
                        auth.getName(), request)
        );
    }

    @PostMapping("/{id}/improve")
    public ResponseEntity<ResumeScoreResponse> improveResume(
            @PathVariable Long id,
            Authentication auth) {

        return ResponseEntity.ok(
                resumeService.improveWithAi(
                        auth.getName(), id)
        );
    }

    @GetMapping("/history")
    public ResponseEntity<List<Resume>> history(Authentication auth) {
        return ResponseEntity.ok(
                resumeService.getUserHistory(auth.getName())
        );
    }
}
