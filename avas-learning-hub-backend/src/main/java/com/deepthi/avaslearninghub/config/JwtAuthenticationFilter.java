package com.deepthi.avaslearninghub.config;

import com.deepthi.avaslearninghub.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

// Spring component that intercepts incoming requests to validate JWT tokens
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // Utility class for handling JWT operations like token extraction and validation
    private final JwtUtil jwtUtil;

    // Constructor injection for JwtUtil
    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // Method that is called for each incoming request to check for a valid JWT token
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
                                    throws ServletException, IOException {
        // Extract the Authorization header from the request
        final String authHeader = request.getHeader("Authorization");
        // Check if the Authorization header is present and starts with "Bearer "
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        // Extract the JWT token from the Authorization header
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);


        // If email exists and authentication is not already set
        if(email !=null && SecurityContextHolder.getContext().getAuthentication() == null){

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(email,null, Collections.emptyList());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);

        }

        filterChain.doFilter(request,response);

    }
}
