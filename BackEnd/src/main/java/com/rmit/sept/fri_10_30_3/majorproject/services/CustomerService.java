package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.CustomerRepository;
import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer saveOrUpdateCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    public Iterable<Customer> findAll(){return customerRepository.findAll();}

    public Optional<Customer> findByID(long id){return customerRepository.findById(id);}
}
