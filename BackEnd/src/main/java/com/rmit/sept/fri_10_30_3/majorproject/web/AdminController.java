package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Admin;
import com.rmit.sept.fri_10_30_3.majorproject.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("")
    public ResponseEntity<Admin> createNewAdmin(@RequestBody Admin admin){
        Admin newAdmin = adminService.saveOrUpdateCustomer(admin);
        return new ResponseEntity<Admin>(admin, HttpStatus.CREATED);
    }
}
