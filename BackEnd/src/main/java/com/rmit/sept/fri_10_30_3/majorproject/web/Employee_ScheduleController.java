package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee_Schedule;
import com.rmit.sept.fri_10_30_3.majorproject.services.Employee_ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class Employee_ScheduleController {
    @Autowired
    Employee_ScheduleService employee_scheduleService;

    @PostMapping("")
    public ResponseEntity<Employee_Schedule> createNewSchedule(@RequestBody Employee_Schedule employee_schedule){
        Employee_Schedule newSchedule = employee_scheduleService.saveOrUpdateSchedule(employee_schedule);
        return new ResponseEntity<Employee_Schedule>(employee_schedule, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Employee_Schedule> getAll() {
        return employee_scheduleService.findAll();
    }

    @GetMapping("{id}")
    public Optional<Employee_Schedule> getByID(@PathVariable long id){
        return employee_scheduleService.findByID(id);
    }
}
