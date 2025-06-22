package com.connectsphere.nexgennetwork.dto.response;

public class LogInResponse {
    public LogInResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }

    private String message;
    private String token; // Optional placeholder for future JWT

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


}
