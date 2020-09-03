package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.EmpolyeeRepository;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmpolyeeRepository empolyeeRepository;

    public Employee saveOrUpdateEmployee(Employee employee){
        //employee.getSchedules().forEach(employee_schedule -> employee_schedule.setEmployee(employee));
        return empolyeeRepository.save(employee);
    }

    public Iterable<Employee> findAll(){return empolyeeRepository.findAll();}

    public Optional<Employee> findByID(long id){return empolyeeRepository.findById(id);}
}
