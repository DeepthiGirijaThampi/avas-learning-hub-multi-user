package com.deepthi.avaslearninghub.repositories;

import com.deepthi.avaslearninghub.models.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository interface for managing Unit entities in the database
public interface UnitRepository extends JpaRepository<Unit,Long> {
    //select * from units where subject_id = ?
    List<Unit> findBySubject_Id(Long subjectId);
}
