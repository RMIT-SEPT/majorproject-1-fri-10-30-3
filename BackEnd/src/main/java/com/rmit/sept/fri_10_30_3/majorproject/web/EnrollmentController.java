package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.EmployeeSchedule;
import com.rmit.sept.fri_10_30_3.majorproject.model.Enrollment;
import com.rmit.sept.fri_10_30_3.majorproject.services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/enrollment")
@CrossOrigin(origins = "*")
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

    @GetMapping("/schedule/{id}")
    public Iterable<Enrollment> findByEmployeeSchedule_ScheduleId(@PathVariable long id){
        return enrollmentService.findByEmployeeSchedule_ScheduleId(id);
    }

    @GetMapping("/customer/{id}")
    public Iterable<Enrollment> findByCustomer_Id(@PathVariable long id){
        return enrollmentService.findByCustomer_Id(id);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<Enrollment> updateExistedEnrollment(@RequestBody Enrollment enrollment
        ,@PathVariable long id){
        Optional<Enrollment> e = enrollmentService.findByID(id);
        if(e.isPresent()){
            e.get().setInfo(enrollment.getInfo());
            enrollmentService.saveOrUpdateEnrollment(e.get());
            return new ResponseEntity<Enrollment>(e.get(), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<Enrollment>(enrollment, HttpStatus.NO_CONTENT);
        }
    }
}
