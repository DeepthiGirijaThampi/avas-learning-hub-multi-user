package com.deepthi.avaslearninghub.repositories;

import com.deepthi.avaslearninghub.models.Reflection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReflectionRepository extends JpaRepository<Reflection,Long> {

    List<Reflection> findByUser_Id(Long userId);
    List<Reflection> findBySubject_Id(Long subjectId);
    List<Reflection> findByUser_IdAndSubject_Id(Long userId, Long subjectId);
}
