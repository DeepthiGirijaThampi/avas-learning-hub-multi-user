package com.deepthi.avaslearninghub.controllers;

import com.deepthi.avaslearninghub.dto.LoginRequest;
import com.deepthi.avaslearninghub.dto.RegisterRequest;
import com.deepthi.avaslearninghub.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Marks this class as a REST controller that handles HTTP requests for authentication-related operations.
@RestController
// Base URL for all authentication endpoints
@RequestMapping("/api/auth")
public class AuthController {

    // Service layer used to handle authentication logic
    private final AuthService authService;

    // Constructor injection for AuthService
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Endpoint to register a new user
    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        try{
            authService.register(request);
            return new ResponseEntity<>("User registerd successfully", HttpStatus.CREATED);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }

    }

    // Endpoint to login a user
    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        try{
            return ResponseEntity.ok(authService.login(request));
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }

    }
}
