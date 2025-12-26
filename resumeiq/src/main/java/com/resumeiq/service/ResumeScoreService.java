package com.resumeiq.service;

import com.resumeiq.util.ScoreCalculator;
import org.springframework.stereotype.Service;

@Service
public class ResumeScoreService {
    public int calculateScore(String resumeText) {
        return ScoreCalculator.calculateScore(resumeText);
    }
}
