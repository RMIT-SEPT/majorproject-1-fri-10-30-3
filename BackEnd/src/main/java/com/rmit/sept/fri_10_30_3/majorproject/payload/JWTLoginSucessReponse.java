package com.rmit.sept.fri_10_30_3.majorproject.payload;

public class JWTLoginSucessReponse {
    private boolean success;
    private String type;
    private String token;

    public JWTLoginSucessReponse(boolean success, String token, String type) {
        this.success = success;
        this.token = token;
        this.type = type;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "JWTLoginSucessReponse{" +
                "success=" + success +
                ", type='" + type +
                ", token='" + token + '\'' +
                '}';
    }
}
