package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.Employee_ScheduleRepository;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee_Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Employee_ScheduleService {
    @Autowired
    Employee_ScheduleRepository employee_scheduleRepository;

    public Employee_Schedule saveOrUpdateSchedule(Employee_Schedule employee_schedule){
        return employee_scheduleRepository.save(employee_schedule);
    }

    public Iterable<Employee_Schedule> findAll(){return employee_scheduleRepository.findAll();}

    public Optional<Employee_Schedule> findByID(long id){return employee_scheduleRepository.findById(id);}
}
