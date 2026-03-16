package com.deepthi.avaslearninghub.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Marks this class as a JPA entity mapped to the "subjects" table
@Entity
@Table(name = "subjects")
public class Subject {

    // Primary key for the subjects table
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     // One-to-many relationship with Unit, mapped by the "subject" field in the Unit class
     @OneToMany(mappedBy = "subject",cascade = CascadeType.ALL,orphanRemoval = true)
     @JsonIgnore
     private List<Unit> units = new ArrayList<>();

     // Many-to-one relationship with User, creates a foreign key column "user_id" in the subjects table
     @ManyToOne
     @JoinColumn(name = "user_id", nullable = false)
     @JsonBackReference
     private User user;

     // One-to-many relationship with Reflection, mapped by the "subject" field in the Reflection class
     @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
     @JsonIgnore
     private List<Reflection> reflections = new ArrayList<>();

     // Subject name, cannot be null and has a maximum length of 80 characters
     @Column(nullable = false,length = 80)
     private String name;
    // @Lob allows storing larger text
     @Lob
     private String description;
     @Column(length = 30)
     private String color;
     @Column(length=50)
     private String icon;
     // Timestamp automatically generated when the subject is created, cannot be updated
     @CreationTimestamp
     @Column(name = "created_at", nullable = false, updatable = false)
     private LocalDateTime createdAt;

    // Default constructor required by JPA
    public Subject() {

    }
    // Constructor used when creating a new subject
    public Subject(User user, String name, String description, String color, String icon) {
        this.user = user;
        this.name = name;
        this.description = description;
        this.color = color;
        this.icon = icon;
    }

    // Getter and setter methods
    public Long getId() {
        return id;
    }

    public List<Unit> getUnits() {
        return units;
    }

    public void setUnits(List<Unit> units) {
        this.units = units;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    //helper methods to add and remove units from subject
    public void addUnit(Unit unit){
        units.add(unit);
        unit.setSubject(this);
    }

    public void removeUnit(Unit unit){
        units.remove(unit);
        unit.setSubject(null);
    }
}
