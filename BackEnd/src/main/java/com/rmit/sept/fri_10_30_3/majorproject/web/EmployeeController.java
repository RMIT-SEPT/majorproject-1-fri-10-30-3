package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import com.rmit.sept.fri_10_30_3.majorproject.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("")
    public ResponseEntity<Employee> createNewWorker(@RequestBody Employee employee){
        Employee newEmployee = employeeService.saveOrUpdateEmployee(employee);
        return new ResponseEntity<Employee>(employee, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Employee> getAll() {
        return employeeService.findAll();
    }

    @GetMapping("{id}")
    public Optional<Employee> getByID(@PathVariable long id){
        return employeeService.findByID(id);
    }
}
