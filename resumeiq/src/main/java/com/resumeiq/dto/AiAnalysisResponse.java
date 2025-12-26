package com.resumeiq.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AiAnalysisResponse {

    private int atsScore;
    private int aiScore;

    private String primaryRole;

    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> jobRoleMatches;

    private List<String> improvementSuggestions;
}
