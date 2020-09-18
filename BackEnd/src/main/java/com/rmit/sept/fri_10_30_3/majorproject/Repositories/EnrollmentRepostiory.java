package com.rmit.sept.fri_10_30_3.majorproject.Repositories;

import com.rmit.sept.fri_10_30_3.majorproject.model.Enrollment;
import org.springframework.data.repository.CrudRepository;

public interface EnrollmentRepostiory extends CrudRepository<Enrollment,Long> {
    @Override
    Iterable<Enrollment> findAllById(Iterable<Long> iterable);

    Iterable<Enrollment> findByCustomer_Id(long id);
    Iterable<Enrollment> findByEmployeeSchedule_ScheduleId(long id);
}
