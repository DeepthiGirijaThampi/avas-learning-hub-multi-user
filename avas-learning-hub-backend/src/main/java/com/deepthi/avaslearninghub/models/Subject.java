package com.deepthi.avaslearninghub.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subjects")
public class Subject {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @OneToMany(mappedBy = "subject",cascade = CascadeType.ALL,orphanRemoval = true)
//     @JsonBackReference
//     @JsonManagedReference
     @JsonIgnore
     private List<Unit> units = new ArrayList<>();

//     @Column(name = "user_id", nullable = false)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
     private User user;

     @Column(nullable = false,length = 80)
     private String name;
     @Lob
     private String description;
     @Column(length = 30)
     private String color;
     @Column(length=50)
     private String icon;
     @CreationTimestamp
     @Column(name = "created_at", nullable = false, updatable = false)
     private LocalDateTime createdAt;


    public Subject() {

    }

    public Subject(User user, String name, String description, String color, String icon) {
        this.user = user;
        this.name = name;
        this.description = description;
        this.color = color;
        this.icon = icon;
    }

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
