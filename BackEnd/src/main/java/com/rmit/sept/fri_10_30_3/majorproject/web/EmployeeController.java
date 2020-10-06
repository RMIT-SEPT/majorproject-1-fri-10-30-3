package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.Validator.EmployeeValidator;
import com.rmit.sept.fri_10_30_3.majorproject.Validator.MapValidationErrorService;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import com.rmit.sept.fri_10_30_3.majorproject.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeValidator employeeValidator;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee (@Valid @RequestBody Employee employee, BindingResult result){
        employeeValidator.validate(employee,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        Employee newEmployee =employeeService.saveEmployee(employee);

        return new ResponseEntity<Employee>(newEmployee, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Employee> getAll() {
        return employeeService.findAll();
    }

    @GetMapping("{id}")
    public Optional<Employee> getByID(@PathVariable long id){
        return employeeService.findByID(id);
    }

    @DeleteMapping("delete/{id}")
    public String deleteById(@PathVariable long id){
        Optional<Employee> e = employeeService.findByID(id);
        if(e.isPresent()){
            employeeService.deleteById(id);
            return e.get().getUserName();
        }else{
            return "NOT FOUND";
        }
    }

    @PutMapping("put/{id}")
    public ResponseEntity<Employee> updateExistedWorker(@RequestBody Employee employee, @PathVariable long id){
        Optional<Employee> e = employeeService.findByID(id);
        //Check if the employee exists or not
        if(e.isPresent()){
            e.get().setId(id);
            e.get().setFname(employee.getFname());
            e.get().setLname(employee.getLname());
            employeeService.saveOrUpdateEmployee(e.get());
            return new ResponseEntity<Employee>(e.get(), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<Employee>(employee, HttpStatus.NO_CONTENT);
        }
    }

}
