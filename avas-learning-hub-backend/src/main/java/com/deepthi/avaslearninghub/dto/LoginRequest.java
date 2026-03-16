package com.deepthi.avaslearninghub.dto;

// Data Transfer Object used to receive login credentials
// from the frontend during user authentication
public class LoginRequest {
    // User email address used for login
    private String email;
    // Password entered by the user for login
    private String password;

    // Default constructor
    public LoginRequest() {
    }

    // Getter and setter methods

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
