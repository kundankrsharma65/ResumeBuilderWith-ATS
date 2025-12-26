package com.resumeiq.util;

import java.util.List;

public class ScoreCalculator {

    public static int calculateScore(String resumeText) {

        int score = 0;

        List<String> skills = List.of(
                "java", "spring", "sql", "react", "html", "css",
                "javascript", "api", "git", "microservices"
        );

        int skillMatches = KeywordMatcher.matchScore(resumeText, skills);
        score += Math.min(skillMatches * 4, 40); // max 40%

        if (resumeText.contains("experience")) score += 25;
        if (resumeText.contains("project")) score += 15;
        if (resumeText.length() > 1000) score += 10;
        if (resumeText.contains("summary")) score += 10;

        return Math.min(score, 100);
    }
}
