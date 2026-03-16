package com.deepthi.avaslearninghub.controllers;

import com.deepthi.avaslearninghub.models.User;
import com.deepthi.avaslearninghub.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller to handle CRUD operations for Users
@RestController
// Base URL for all user-related endpoints
@RequestMapping("/api/users")
public class UserController {

    // Repository for accessing data related to users
    @Autowired
    private UserRepository userRepository;

    //CRUD operations for Users
    //Retrieve all users
    @GetMapping
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    //Get a user by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id : "+id));
    }

    //Create a new user
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        User saved = userRepository.save(user);
        return new ResponseEntity<>(saved,HttpStatus.CREATED);
    }

    //Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser){
        return userRepository.findById(id)
                .<ResponseEntity<?>>map(user -> {
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    user.setPasswordHash(updatedUser.getPasswordHash());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User not found with id : "+id));
    }

    //Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with id : "+id);
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
