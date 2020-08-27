package com.rmit.sept.fri_10_30_3.majorproject.Repositories;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee_Schedule;
import org.springframework.data.repository.CrudRepository;

public interface Employee_ScheduleRepository extends CrudRepository<Employee_Schedule,Long> {
    @Override
    Iterable<Employee_Schedule> findAllById(Iterable<Long> iterable);
}
