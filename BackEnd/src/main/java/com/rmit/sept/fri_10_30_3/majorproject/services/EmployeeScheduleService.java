package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.EmployeeScheduleRepository;
import com.rmit.sept.fri_10_30_3.majorproject.model.EmployeeSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeScheduleService {
    @Autowired
    EmployeeScheduleRepository employee_scheduleRepository;

    public EmployeeSchedule saveOrUpdateSchedule(EmployeeSchedule employee_schedule){
        return employee_scheduleRepository.save(employee_schedule);
    }

    public Iterable<EmployeeSchedule> findAll(){return employee_scheduleRepository.findAll();}

    public Optional<EmployeeSchedule> findByID(long id){return employee_scheduleRepository.findById(id);}

    public Iterable<EmployeeSchedule> findByEmployee_Id(long id){return employee_scheduleRepository.findByEmployee_Id(id);}

    public Iterable<EmployeeSchedule> findBySkills_SkillId(long id){
        return employee_scheduleRepository.findBySkills_SkillId(id);
    }

    public Optional<EmployeeSchedule> deleteByScheduleId(long id){
        return employee_scheduleRepository.deleteByScheduleId(id);
    }
}
