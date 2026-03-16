package com.deepthi.avaslearninghub.dto;

// Data Transfer Object used to send authentication data
// from the backend to the frontend after a successful login
public class AuthResponse {

    // JWT token generated after user authentication
    private String token;
    // Unique identifier of the authenticated user
    private Long userId;
    // Full name of the user
    private String name;
    // User email address
    private String email;

    // Default constructor
    public AuthResponse() {
    }

    // Constructor used to create the response object after successful login
    public AuthResponse(String token, Long userId, String name, String email) {
        this.token = token;
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    // Getter and setter methods
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
