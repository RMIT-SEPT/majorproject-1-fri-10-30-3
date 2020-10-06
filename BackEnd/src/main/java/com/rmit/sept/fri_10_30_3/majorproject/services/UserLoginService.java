package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.AdminRepository;
import com.rmit.sept.fri_10_30_3.majorproject.Repositories.CustomerRepository;
import com.rmit.sept.fri_10_30_3.majorproject.Repositories.EmpolyeeRepository;
import com.rmit.sept.fri_10_30_3.majorproject.Repositories.EnrollmentRepostiory;
import com.rmit.sept.fri_10_30_3.majorproject.model.Admin;
import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserLoginService implements UserDetailsService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private EmpolyeeRepository empolyeeRepository;
    //Get user type as a String
    public String getUserType(String username){
        Customer customer = customerRepository.findByUserName(username);
        Admin admin = adminRepository.findByUserName(username);
        Employee employee = empolyeeRepository.findByUserName(username);
        if(customer != null) {
            return "Customer";
        }else if(admin != null){
            return "Admin";
        }else if(employee != null) {
            return "Employee";
        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Customer customer = customerRepository.findByUserName(username);
       Admin admin = adminRepository.findByUserName(username);
       Employee employee = empolyeeRepository.findByUserName(username);
       if(employee != null) {
           return employee;
       }else if(admin != null){
           return admin;
       }else if(customer != null){
           return customer;
       }else{
           new UsernameNotFoundException("User Not Found.");
       }
       return null;
    }

    @Transactional
    public UserDetails loadUserById(Long id){
        Customer customer = customerRepository.getById(id);
        Admin admin = adminRepository.getById(id);
        Employee employee = empolyeeRepository.getById(id);
        if(employee != null) {
            return employee;
        }else if(admin != null){
            return admin;
        }else if(customer != null){
            return customer;
        }else{
            new UsernameNotFoundException("User Not Found.");
        }
        return null;
    }
}
