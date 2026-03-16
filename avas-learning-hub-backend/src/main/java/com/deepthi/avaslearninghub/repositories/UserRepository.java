package com.deepthi.avaslearninghub.repositories;

import com.deepthi.avaslearninghub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
// Repository interface for managing User entities in the database
public interface UserRepository extends JpaRepository<User,Long> {

    // Custom query methods to find users by email and check for existence based on email or username
    User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
