package com.deepthi.avaslearninghub.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Marks this class as a JPA entity mapped to the "users" table
@Entity
@Table(name = "users")
public class User {
    // Primary key for the users table
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     // One-to-many relationship with Subject, mapped by the "user" field in the Subject class
     @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
     @JsonIgnore
     private List<Subject> subjects = new ArrayList<>();

     // Username, cannot be null, must be unique, and has a maximum length of 50 characters
     @Column(nullable = false, unique = true, length = 50)
     private String username;
     // Full name, cannot be null and has a maximum length of 80 characters
     @Column(nullable = false, length = 80)
     private String name;
     // Email, cannot be null, must be unique, and has a maximum length of 100 characters
     @Column(nullable = false,unique = true, length = 100)
     private String email;
     // Password hash, cannot be null and has a maximum length of 255 characters
     @JsonIgnore
     @Column(name = "password_hash", nullable = false, length = 255)
     private String passwordHash;
     // Role, cannot be null and has a maximum length of 10 characters, defaults to "STUDENT"
     @Column(nullable = false, length = 10)
     private String role = "STUDENT";

        // Timestamp automatically generated when the user is created, cannot be updated
     @CreationTimestamp
     @Column(name = "created_at", nullable = false, updatable = false)
     private LocalDateTime createdAt;
        // Default constructor required by JPA
        public User() {
        }
        // Constructor used when creating a new user
        public User(String username, String name, String email, String passwordHash) {
            this.username = username;
            this.name = name;
            this.email = email;
            this.passwordHash = passwordHash;
        }
        // Getter and setter methods
        public Long getId() {
            return id;
        }

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

        public String getPasswordHash() {
            return passwordHash;
        }

        public void setPasswordHash(String passwordHash) {
            this.passwordHash = passwordHash;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public List<Subject> getSubjects() {
            return subjects;
        }


}
