package com.connectsphere.nexgennetwork.dto.response;


public class ApiResponse<T> {
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private T data;
    private String message;

    public ApiResponse(T data, String message, int httpStatusCode) {
        this.data = data;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

    private int httpStatusCode;

    public void setHttpStatusCode(int httpStatusCode) {
        this.httpStatusCode = httpStatusCode;
    }

    public int getHttpStatusCode() {
        return httpStatusCode;
    }


}
