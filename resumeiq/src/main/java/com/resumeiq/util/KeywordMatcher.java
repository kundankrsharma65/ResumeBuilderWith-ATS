package com.resumeiq.util;

import java.util.List;

public class KeywordMatcher {

    private KeywordMatcher() {}

    /**
     * Counts how many keywords are present in resume text.
     */
    public static int matchScore(String resumeText, List<String> keywords) {

        if (resumeText == null || resumeText.isBlank()) {
            return 0;
        }

        String text = resumeText.toLowerCase();
        int count = 0;

        for (String keyword : keywords) {
            if (text.contains(keyword.toLowerCase())) {
                count++;
            }
        }

        return count;
    }
}
