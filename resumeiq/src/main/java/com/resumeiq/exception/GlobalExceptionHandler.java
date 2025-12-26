package com.resumeiq.exception;

import com.resumeiq.dto.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ApiResponse handleRuntime(RuntimeException ex) {
        return new ApiResponse(ex.getMessage());
    }
}

