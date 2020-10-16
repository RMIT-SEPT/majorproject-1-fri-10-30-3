package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import com.rmit.sept.fri_10_30_3.majorproject.model.EmployeeSchedule;
import com.rmit.sept.fri_10_30_3.majorproject.services.EmployeeScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class EmployeeScheduleController {
    @Autowired
    EmployeeScheduleService employee_scheduleService;

    @PostMapping("")
    public ResponseEntity<EmployeeSchedule> createNewSchedule(@RequestBody EmployeeSchedule employee_schedule){
        EmployeeSchedule newSchedule = employee_scheduleService.saveOrUpdateSchedule(employee_schedule);
        return new ResponseEntity<EmployeeSchedule>(employee_schedule, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<EmployeeSchedule> getAll() {
        return employee_scheduleService.findAll();
    }

    @GetMapping("{id}")
    public Optional<EmployeeSchedule> getByID(@PathVariable long id){
        return employee_scheduleService.findByID(id);
    }

    @GetMapping("/employee/{id}")
    public Iterable<EmployeeSchedule> getByEmployee_Id(@PathVariable long id){
        return employee_scheduleService.findByEmployee_Id(id);
    }

    @GetMapping("/skill/{id}")
    public Iterable<EmployeeSchedule> getBySkill_Id(@PathVariable long id){
        return employee_scheduleService.findBySkills_SkillId(id);
    }
    @Transactional
    @DeleteMapping("/delete/{id}")
    public Optional<EmployeeSchedule> deleteByScheduleId(@PathVariable long id){
        return employee_scheduleService.deleteByScheduleId(id);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<EmployeeSchedule> updateExistedSchedule(@RequestBody EmployeeSchedule employeeSchedule
            ,@PathVariable long id){
        Optional<EmployeeSchedule> s = employee_scheduleService.findByID(id);
        if(s.isPresent()){
            s.get().setScheduleId(id);
            s.get().setAvailability(employeeSchedule.getAvailability());
            s.get().setCapacity(employeeSchedule.getCapacity());
            s.get().setLength(employeeSchedule.getLength());
            s.get().setPrice(employeeSchedule.getPrice());
            s.get().setStartingHour(employeeSchedule.getStartingHour());
            employee_scheduleService.saveOrUpdateSchedule(s.get());
            return new ResponseEntity<EmployeeSchedule>(s.get(), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<EmployeeSchedule>(employeeSchedule, HttpStatus.NO_CONTENT);
        }
    }
}
