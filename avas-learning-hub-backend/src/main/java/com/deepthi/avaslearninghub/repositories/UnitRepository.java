package com.deepthi.avaslearninghub.repositories;

import com.deepthi.avaslearninghub.models.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitRepository extends JpaRepository<Unit,Long> {
    List<Unit> findBySubject_Id(Long subjectId);
}
