package com.deepthi.avaslearninghub.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "units")
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "subject_id", nullable = false)
    private Long subjectId;
    @Column(nullable = false, length = 80)
    private String title;
    @Column
    private boolean isCompleted = false;
    @Column
    private LocalDateTime completedAt;
    @Column
    private Integer sortOrder;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Unit() {
    }

    public Unit(Long subjectId, String title, boolean isCompleted, LocalDateTime completedAt, Integer sortOrder, LocalDateTime createdAt) {
        this.subjectId = subjectId;
        this.title = title;
        this.isCompleted = isCompleted;
        this.completedAt = completedAt;
        this.sortOrder = sortOrder;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}
