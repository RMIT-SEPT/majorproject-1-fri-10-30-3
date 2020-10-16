package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.CustomerRepository;
import com.rmit.sept.fri_10_30_3.majorproject.execptions.UsernameAlreadyExistsException;
import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    //New method for register
    public Customer saveCustomer(Customer newCustomer){
        try{
            newCustomer.setPassword(bCryptPasswordEncoder.encode(newCustomer.getPassword()));
            newCustomer.setUserName(newCustomer.getUsername());
            newCustomer.setConfirmPassword("");
            newCustomer.setFname(newCustomer.getFname());
            newCustomer.setLname(newCustomer.getFname());
            newCustomer.setAddress(newCustomer.getAddress());
            newCustomer.setPhone(newCustomer.getPhone());
            return customerRepository.save(newCustomer);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newCustomer.getUsername()+"' already exists");
        }
    }

    public Customer saveOrUpdateCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    public Iterable<Customer> findAll(){return customerRepository.findAll();}

    public Optional<Customer> findByID(long id){return customerRepository.findById(id);}

    public Optional<Customer> deleteById(long id){return customerRepository.deleteById(id);}
}
