package com.rmit.sept.fri_10_30_3.majorproject.Validator;

import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class EmployeeValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Employee.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Employee employee = (Employee) o;
        //Password length check
        if(employee.getPassword().length() < 6){
            errors.rejectValue("password","Length", "Password must be at least 6 characters");
        }
        //Password matching check
        if(!employee.getPassword().equals(employee.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match", "Passwords must match");
        }
    }
}
