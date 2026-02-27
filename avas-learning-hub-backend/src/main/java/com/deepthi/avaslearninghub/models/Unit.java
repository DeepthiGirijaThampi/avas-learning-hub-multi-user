package com.deepthi.avaslearninghub.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "units")
public class Unit {
    @Id
    private Long id;
    @Column
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




}
