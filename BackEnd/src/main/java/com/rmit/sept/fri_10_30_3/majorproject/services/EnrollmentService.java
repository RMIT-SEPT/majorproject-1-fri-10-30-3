package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.EnrollmentRepostiory;
import com.rmit.sept.fri_10_30_3.majorproject.model.Enrollment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepostiory enrollmentRepostiory;

    public Enrollment saveOrUpdateEnrollment(Enrollment enrollment){
        return enrollmentRepostiory.save(enrollment);
    }

    public Iterable<Enrollment> findAll(){return enrollmentRepostiory.findAll();}

    public Optional<Enrollment> findByID(long id){return enrollmentRepostiory.findById(id);}

    public Iterable<Enrollment> findByEmployeeSchedule_ScheduleId(long id){
        return enrollmentRepostiory.findByEmployeeSchedule_ScheduleId(id);
    }

    public Iterable<Enrollment> findByCustomer_Id(long id){
        return enrollmentRepostiory.findByCustomer_Id(id);
    }

}
