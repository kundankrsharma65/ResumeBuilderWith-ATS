// FILE: src/main/java/com/resumeiq/dto/AiResumeGenerateResponse.java
package com.resumeiq.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AiResumeGenerateResponse {

    private String resumeText;
    private int atsScore;
    private int aiScore;
    private List<String> suggestions;
}
