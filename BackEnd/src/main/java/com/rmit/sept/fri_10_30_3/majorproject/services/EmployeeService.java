package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.EmpolyeeRepository;
import com.rmit.sept.fri_10_30_3.majorproject.execptions.UsernameAlreadyExistsException;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmpolyeeRepository empolyeeRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //New method for creating employee
    public Employee saveEmployee(Employee newEmployee){
        try{
            newEmployee.setPassword(bCryptPasswordEncoder.encode(newEmployee.getPassword()));
            newEmployee.setUserName(newEmployee.getUsername());
            newEmployee.setConfirmPassword("");
            newEmployee.setFname(newEmployee.getFname());
            newEmployee.setLname(newEmployee.getFname());
            return empolyeeRepository.save(newEmployee);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newEmployee.getUsername()+"' already exists");
        }
    }

    public Employee saveOrUpdateEmployee(Employee employee){
        return empolyeeRepository.save(employee);
    }

    public Iterable<Employee> findAll(){return empolyeeRepository.findAll();}

    public Optional<Employee> findByID(long id){return empolyeeRepository.findById(id);}

    public Optional<Employee> deleteById(long id){return empolyeeRepository.deleteById(id);}
}
