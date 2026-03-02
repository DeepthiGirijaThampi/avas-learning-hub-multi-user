package com.deepthi.avaslearninghub.controllers;

import com.deepthi.avaslearninghub.models.Subject;
import com.deepthi.avaslearninghub.models.Unit;
import com.deepthi.avaslearninghub.repositories.SubjectRepository;
import com.deepthi.avaslearninghub.repositories.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/units")
public class UnitController {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private SubjectRepository subjectRepository;


    //CRUD operations for Units
    //Retrieve all units
    @GetMapping
    public ResponseEntity<?> getAllUnits(){
        List<Unit> units = unitRepository.findAll();
        return ResponseEntity.ok(units);
    }
    //Get a unit by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getUnitById(@PathVariable Long id){
        return unitRepository.findById(id)
                .<ResponseEntity<?>>map(unit -> ResponseEntity.ok(unit))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unit not found with id: " + id));
    }

    //Get units by subject id
    @GetMapping("/by-subject/{subjectId}")
    public ResponseEntity<?> getUnitsBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(unitRepository.findBySubjectId(subjectId));
    }
    //Create a new unit
    @PostMapping
    public ResponseEntity<?> createUnit(@RequestBody Unit unit){
//        Unit saved = unitRepository.save(unit);
//        return new ResponseEntity<>(saved, HttpStatus.CREATED);
        // 1)validate subject exists
        if(unit.getSubject() == null || unit.getSubject().getId() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Subject id is required.");
        }

        Long subjectId = unit.getSubject().getId();
        // 2)Fetch real subject from db
        Subject subject = subjectRepository.findById(subjectId).orElse(null);
         if(subject == null){
             return ResponseEntity.status(HttpStatus.NOT_FOUND)
                     .body("Subject not found with id : "+ subjectId);
         }
        //3)Attach real subject entity to unit
        unit.setSubject((subject));
        //4)Save unit
        Unit saved = unitRepository.save(unit);
        return new ResponseEntity<>(saved,HttpStatus.CREATED);
    }
    //Update an existing unit
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUnit(@PathVariable Long id,@RequestBody Unit updatedUnit){
        return unitRepository.findById(id)
                .<ResponseEntity<?>>map(unit -> {
                     unit.setTitle(updatedUnit.getTitle());
                     unit.setDescription(updatedUnit.getDescription());

                     boolean wasCompleted = unit.isCompleted();
                     boolean nowCompleted = updatedUnit.isCompleted();

                        unit.setCompleted(nowCompleted);

                        if (!wasCompleted && nowCompleted) {
                            unit.setCompletedAt(LocalDateTime.now());
                        } else if (wasCompleted && !nowCompleted) {
                            unit.setCompletedAt(null);
                        }
                     return ResponseEntity.ok(unitRepository.save(unit));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body("Unit not found"));
    }
    //Delete a unit
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUnit(@PathVariable Long id){
        if(!unitRepository.existsById(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Unit not found");
        }
        unitRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
