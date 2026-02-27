package com.deepthi.avaslearninghub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "subjects")
public class Subject {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     @Column(nullable = false,length = 80)
     private String name;
     @Column(length = 30)
     private String color;
     @Column(length=50)
     private String icon;





}
