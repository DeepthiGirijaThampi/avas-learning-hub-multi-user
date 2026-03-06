package com.deepthi.avaslearninghub.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reflections")
public class Reflection {
//    id bigint [pk, increment]
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//  user_id bigint [not null]
//    @Column(name = "user_id", nullable = false)
//    private Long userId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
//    @JsonBackReference
    private User user;

//  subject_id bigint
//    @Column(name = "subject_id")
//    private Long subjectId;
    @ManyToOne
    @JoinColumn(name = "subject_id")
//    @JsonBackReference
    private Subject subject;

//  content text [not null]
    @Lob
    @Column(nullable = false)
    private String content;
//  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Reflection() {
    }

    public Reflection(User user, Subject subject, String content) {
        this.user = user;
        this.subject = subject;
        this.content = content;
    }

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
