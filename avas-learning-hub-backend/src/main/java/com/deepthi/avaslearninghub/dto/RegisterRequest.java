package com.deepthi.avaslearninghub.dto;

// Data Transfer Object used to receive registration data
// from the frontend when a new user is signing up
public class RegisterRequest {

    // Username chosen by the user for registration
    private String username;
    // Full name of the user
    private String name;
    // User email address used for registration
    private String email;
    // Password chosen by the user for registration
    private String password;
    // Default constructor
    public RegisterRequest(){

    }

    // Getter and setter methods
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
