package com.deepthi.avaslearninghub.controllers;

import com.deepthi.avaslearninghub.models.Subject;
import com.deepthi.avaslearninghub.models.User;
import com.deepthi.avaslearninghub.repositories.SubjectRepository;
import com.deepthi.avaslearninghub.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private UserRepository userRepository;

    // CRUD operations for subjects
    //Retrieve all subjects
    @GetMapping
    public ResponseEntity<?> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    //Get a subject by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getSubjectById(@PathVariable Long id) {
        return subjectRepository.findById(id)
                .<ResponseEntity<?>>map(subject -> ResponseEntity.ok().body(subject))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subject not found "));
    }

    //Get subjects by user id
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<?> getSubjectsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(subjectRepository.findByUser_Id(userId));
    }

    // Create a new subject
    @PostMapping
    public ResponseEntity<?> createSubject(@RequestBody Subject subject) {

//        Subject saved = subjectRepository.save(subject);
//        return new ResponseEntity<>(saved, HttpStatus.CREATED);

        // check if user exists
        if(subject.getUser()==null || subject.getUser().getId() == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found ");
        }
        //fetch real user from db
        Long userId = subject.getUser().getId();
        User user = userRepository.findById(userId).orElse(null);
        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }
        //attach it to Subject
        subject.setUser(user);
        // save
        Subject saved = subjectRepository.save(subject);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    // Update an existing subject
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long id, @RequestBody Subject updatedSubject) {
        return subjectRepository.findById(id)
                .<ResponseEntity<?>>map(subject -> {
                    subject.setName(updatedSubject.getName());
                    subject.setDescription(updatedSubject.getDescription());
                    subject.setColor(updatedSubject.getColor());
                    subject.setIcon(updatedSubject.getIcon());
                    Subject saved = subjectRepository.save(subject);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Subject not found  " ));
    }
    // Delete a subject
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        if (!subjectRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Subject not found with id: " + id);
        }
        subjectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
