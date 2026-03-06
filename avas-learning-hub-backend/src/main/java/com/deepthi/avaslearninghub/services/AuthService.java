package com.deepthi.avaslearninghub.services;

import com.deepthi.avaslearninghub.dto.AuthResponse;
import com.deepthi.avaslearninghub.dto.LoginRequest;
import com.deepthi.avaslearninghub.dto.RegisterRequest;
import com.deepthi.avaslearninghub.models.User;
import com.deepthi.avaslearninghub.repositories.UserRepository;
import com.deepthi.avaslearninghub.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    //Register new user
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    //Login user
    public AuthResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail());

        if(user == null){
            throw new RuntimeException("Invalid email or password");
        }
        if(!passwordEncoder.matches(request.getPassword(),user.getPasswordHash())){
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token,
                user.getId(),
                user.getName(),
                user.getEmail());
    }

}
