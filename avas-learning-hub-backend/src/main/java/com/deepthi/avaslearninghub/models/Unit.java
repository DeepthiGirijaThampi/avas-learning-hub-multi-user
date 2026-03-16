package com.deepthi.avaslearninghub.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

// Marks this class as a JPA entity mapped to the "units" table
@Entity
@Table(name = "units")
public class Unit {
    // Primary key for the units table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Many-to-one relationship with Subject, creates a foreign key column "subject_id" in the units table
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;
    // Unit title, cannot be null and has a maximum length of 120 characters
    @Column(nullable = false, length = 120)
    private String title;
    // @Lob allows storing larger text for the unit description
    @Lob
    private String description;
    // Indicates whether the unit is completed, cannot be null and defaults to false
    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted = false;
    // Timestamp for when the unit was completed, can be null
    @Column(name= "completed_at")
    private LocalDateTime completedAt;
    @Column(nullable = true)
    private Integer sortOrder;
    // Timestamp automatically generated when the unit is created, cannot be updated
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Default constructor required by JPA
    public Unit() {
    }

    // Constructor used when creating a new unit
    public Unit(Subject subject, String title, String description, Integer sortOrder) {
        this.subject = subject;
        this.title = title;
        this.sortOrder = sortOrder;
        this.description = description;
    }

    // Getter and setter methods
    public Long getId() {
        return id;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
