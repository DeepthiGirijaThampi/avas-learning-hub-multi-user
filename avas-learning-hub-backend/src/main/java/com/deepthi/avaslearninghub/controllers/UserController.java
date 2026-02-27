package com.deepthi.avaslearninghub.controllers;

import com.deepthi.avaslearninghub.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //CRUD operations for Users
    //Retrieve all users
    //Get a user by id
    //Create a new user
    //Update an existing user
    //Delete a user
}
