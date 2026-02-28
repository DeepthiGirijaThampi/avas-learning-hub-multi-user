package com.deepthi.avaslearninghub.models;

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
    @Column(name = "user_id", nullable = false)
    private Long userId;
//  subject_id bigint
    @Column(name = "subject_id")
    private Long subjectId;
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

    public Reflection(Long userId, Long subjectId, String content) {
        this.userId = userId;
        this.subjectId = subjectId;
        this.content = content;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
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
