package com.rmit.sept.fri_10_30_3.majorproject.Repositories;

import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer,Long> {

    @Override
    Iterable<Customer> findAllById(Iterable<Long> iterable);
    //New methods after milestone2
    Customer findByUserName(String username);
    Customer getById(Long id);
}
