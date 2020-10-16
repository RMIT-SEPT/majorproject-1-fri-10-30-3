package com.rmit.sept.fri_10_30_3.majorproject.Repositories;

import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CustomerRepository extends CrudRepository<Customer,Long> {

    @Override
    Iterable<Customer> findAllById(Iterable<Long> iterable);
    //New methods after milestone2
    Customer findByUserName(String username);
    Customer getById(Long id);
    Optional<Customer> deleteById(long id);
}
