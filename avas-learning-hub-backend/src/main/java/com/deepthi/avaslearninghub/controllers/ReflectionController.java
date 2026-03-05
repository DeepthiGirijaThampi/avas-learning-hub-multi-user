package com.deepthi.avaslearninghub.controllers;

import com.deepthi.avaslearninghub.models.Reflection;
import com.deepthi.avaslearninghub.repositories.ReflectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reflections")
public class ReflectionController {

    @Autowired
    private ReflectionRepository reflectionRepository;


    //CRUD Operations for Reflections

    //Get all reflections
    @GetMapping
    public ResponseEntity<?> getAllReflections(){
        List<Reflection> reflections = reflectionRepository.findAll();
        return ResponseEntity.ok(reflections);
    }
    //Get a reflection by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getReflectionById(@PathVariable Long id){
        return reflectionRepository.findById(id)
                .<ResponseEntity<?>>map( reflection -> ResponseEntity.ok(reflection))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reflection not found with id: " + id));
    }
    //Create a new reflection
    @PostMapping
    public ResponseEntity<?> createReflection(@RequestBody Reflection reflection){
        Reflection saved = reflectionRepository.save(reflection);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    //Update an existing reflection
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReflection(@PathVariable Long id,@RequestBody Reflection updatedReflection){
        return reflectionRepository.findById(id)
                .<ResponseEntity<?>>map(reflection -> {
                    reflection.setContent(updatedReflection.getContent());
                    return ResponseEntity.ok(reflectionRepository.save(reflection));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reflection not found with id: " + id));
    }
    //Delete a reflection
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReflection(@PathVariable Long id){
        if(!reflectionRepository.existsById(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reflection not found with id: " + id);
        }
        reflectionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
