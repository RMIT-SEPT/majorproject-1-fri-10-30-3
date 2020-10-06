package com.rmit.sept.fri_10_30_3.majorproject.Validator;

import com.rmit.sept.fri_10_30_3.majorproject.model.Admin;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class AdminValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Admin.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Admin admin = (Admin) o;
        //Password length check
        if(admin.getPassword().length() < 6){
            errors.rejectValue("password","Length", "Password must be at least 6 characters");
        }
        //Password matching check
        if(!admin.getPassword().equals(admin.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match", "Passwords must match");
        }
    }
}
