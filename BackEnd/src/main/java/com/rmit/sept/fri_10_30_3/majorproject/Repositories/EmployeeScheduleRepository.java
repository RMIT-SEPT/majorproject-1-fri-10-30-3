package com.rmit.sept.fri_10_30_3.majorproject.Repositories;
import com.rmit.sept.fri_10_30_3.majorproject.model.EmployeeSchedule;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface EmployeeScheduleRepository extends CrudRepository<EmployeeSchedule,Long> {
    @Override
    Iterable<EmployeeSchedule> findAllById(Iterable<Long> iterable);

    Iterable<EmployeeSchedule> findByEmployee_Id(long id);

    Iterable<EmployeeSchedule> findBySkills_SkillId(long id);

    Optional<EmployeeSchedule> deleteByScheduleId(long id);
}
