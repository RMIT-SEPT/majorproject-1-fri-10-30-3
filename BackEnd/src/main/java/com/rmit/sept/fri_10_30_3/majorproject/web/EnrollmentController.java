package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Enrollment;
import com.rmit.sept.fri_10_30_3.majorproject.model.Skills;
import com.rmit.sept.fri_10_30_3.majorproject.services.EnrollmentService;
import com.rmit.sept.fri_10_30_3.majorproject.services.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("")
    public ResponseEntity<Enrollment> createNewEnrollment(@RequestBody Enrollment enrollment){
        Enrollment newEnrollment = enrollmentService.saveOrUpdateEnrollment(enrollment);
        return new ResponseEntity<Enrollment>(enrollment, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Enrollment> getAll() {
        return enrollmentService.findAll();
    }

    @GetMapping("{id}")
    public Optional<Enrollment> getByID(@PathVariable long id){
        return enrollmentService.findByID(id);
    }
}
