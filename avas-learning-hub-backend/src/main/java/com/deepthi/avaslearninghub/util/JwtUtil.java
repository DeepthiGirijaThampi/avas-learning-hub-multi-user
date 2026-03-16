package com.deepthi.avaslearninghub.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

// Utility class for handling JWT token generation and validation
@Component
public class JwtUtil {

    //secret key for signing the JWT token
    private static final String SECRET_KEY = "this-is-a-very-long-key-for-avas-learning-hub-jwt-signing";
    //token expiration
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 5; //5 hours

    //method to get signing key
    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    //generate JWT token
    public String generateToken(String email){

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //extract email from token
    public String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

}
