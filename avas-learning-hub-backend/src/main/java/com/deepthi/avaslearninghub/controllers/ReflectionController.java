package com.deepthi.avaslearninghub.controllers;

import com.deepthi.avaslearninghub.models.Reflection;
import com.deepthi.avaslearninghub.models.Subject;
import com.deepthi.avaslearninghub.models.User;
import com.deepthi.avaslearninghub.repositories.ReflectionRepository;
import com.deepthi.avaslearninghub.repositories.SubjectRepository;
import com.deepthi.avaslearninghub.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller to handle CRUD operations for Reflections
@RestController
// Base URL for all reflection-related endpoints
@RequestMapping("/api/reflections")
public class ReflectionController {

    // Repositories for accessing data related to reflections, users, and subjects
    @Autowired
    private ReflectionRepository reflectionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SubjectRepository subjectRepository;

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

    //Get reflections by user id
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<?> getReflectionsByUser(@PathVariable Long userId){
        return ResponseEntity.ok(reflectionRepository.findByUser_Id(userId));
    }

    //Get reflections by subject id
    @GetMapping("/by-subject/{subjectId}")
    public ResponseEntity<?> getReflectionsBySubject(@PathVariable Long subjectId){
        return ResponseEntity.ok(reflectionRepository.findBySubject_Id(subjectId));
    }

    //Get reflections by user id and subject id
    @GetMapping("/by-user/{userId}/by-subject/{subjectId}")
    public ResponseEntity<?> getReflectionsByUserAndSubject(@PathVariable Long userId,
                                                            @PathVariable Long subjectId) {
        return ResponseEntity.ok(reflectionRepository.findByUser_IdAndSubject_Id(userId, subjectId));
    }

    //Create a new reflection
    @PostMapping
    public ResponseEntity<?> createReflection(@RequestBody Reflection reflection){
        // 1) validate user exists
        if(reflection.getUser() == null || reflection.getUser().getId() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("User id is required.");
        }
        //else fetch the user from db and set to reflection
        Long userId = reflection.getUser().getId();
        User user = userRepository.findById(userId).orElse(null);
        //if user is not found return error
        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with id: " + userId);
        }

        //subject optional part
        Subject subject = null;
        if(reflection.getSubject() != null && reflection.getSubject().getId() != null){
            Long subjectId = reflection.getSubject().getId();
            subject = subjectRepository.findById(subjectId).orElse(null);
            if(subject == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Subject not found with id: " + subjectId);
            }
        }

        //attach real user and subject to reflection
        reflection.setUser(user);
        reflection.setSubject(subject);

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
