package com.deepthi.avaslearninghub.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

// Marks this class as a JPA entity mapped to a database table
@Entity
// Specifies the table name in the database
@Table(name = "reflections")
public class Reflection {
    // Primary key for the reflections table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Creates a foreign key column 'user_id' in the reflections table
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Foreign key column 'subject_id'
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    // @Lob allows storing large text in the database
    @Lob
    @Column(nullable = false)
    private String content;
    // Timestamp automatically generated when the reflection is created
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Default constructor required by JPA
    public Reflection() {
    }

    // Constructor used when creating a new reflection
    public Reflection(User user, Subject subject, String content) {
        this.user = user;
        this.subject = subject;
        this.content = content;
    }

    // Getter and setter methods
    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
