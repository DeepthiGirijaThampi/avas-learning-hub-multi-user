package com.deepthi.avaslearninghub.repositories;

import com.deepthi.avaslearninghub.models.Reflection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository interface for managing Reflection entities in the database
public interface ReflectionRepository extends JpaRepository<Reflection,Long> {

    // Custom query methods to find reflections based on user ID, subject ID, or both
    List<Reflection> findByUser_Id(Long userId);
    List<Reflection> findBySubject_Id(Long subjectId);
    List<Reflection> findByUser_IdAndSubject_Id(Long userId, Long subjectId);
}
