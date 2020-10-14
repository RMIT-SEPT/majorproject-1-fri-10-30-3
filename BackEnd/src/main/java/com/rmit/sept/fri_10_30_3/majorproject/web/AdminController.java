package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.Validator.AdminValidator;
import com.rmit.sept.fri_10_30_3.majorproject.Validator.CustomerValidator;
import com.rmit.sept.fri_10_30_3.majorproject.Validator.MapValidationErrorService;
import com.rmit.sept.fri_10_30_3.majorproject.model.Admin;
import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.security.JwtTokenProvider;
import com.rmit.sept.fri_10_30_3.majorproject.services.AdminService;
import com.rmit.sept.fri_10_30_3.majorproject.services.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @Autowired
    private AdminValidator adminValidator;
    @PostMapping("/register")
    public ResponseEntity<?> createNewAdmin(@Valid @RequestBody Admin admin, BindingResult result){
        adminValidator.validate(admin,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        Admin newAdmin = adminService.saveAdmin(admin);
        return new ResponseEntity<Admin>(newAdmin, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Admin> getAll() {
        return adminService.findAll();
    }

    @GetMapping("{id}")
    public Optional<Admin> getByID(@PathVariable long id){
        return adminService.findByID(id);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<Admin> updateExistedWorker(@RequestBody Admin admin, @PathVariable long id){
        Optional<Admin> e = adminService.findByID(id);
        //Check if the employee exists or not
        if(e.isPresent()){
            e.get().setId(id);
            e.get().setCompanyName(admin.getCompanyName());
            e.get().getFname();
            e.get().getLname();
            adminService.saveOrUpdateAdmin(e.get());
            return new ResponseEntity<Admin>(e.get(), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<Admin>(admin, HttpStatus.NO_CONTENT);
        }
    }
}
