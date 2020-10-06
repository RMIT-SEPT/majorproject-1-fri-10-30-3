package com.rmit.sept.fri_10_30_3.majorproject.Validator;

import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class CustomerValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Customer.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Customer customer = (Customer) o;
        //Password length check
        if(customer.getPassword().length() < 6){
            errors.rejectValue("password","Length", "Password must be at least 6 characters");
        }
        //Password matching check
        if(!customer.getPassword().equals(customer.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match", "Passwords must match");
        }
    }
}
