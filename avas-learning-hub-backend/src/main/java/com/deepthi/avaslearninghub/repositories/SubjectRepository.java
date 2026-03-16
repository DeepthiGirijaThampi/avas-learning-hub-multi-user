package com.deepthi.avaslearninghub.repositories;

import com.deepthi.avaslearninghub.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository interface for managing Subject entities in the database
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    //select * from subjects where user_id = ?
    List<Subject> findByUser_Id(Long userId);
}
