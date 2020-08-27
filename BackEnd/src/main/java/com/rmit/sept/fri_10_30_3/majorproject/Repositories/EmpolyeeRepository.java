package com.rmit.sept.fri_10_30_3.majorproject.Repositories;

import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmpolyeeRepository extends CrudRepository<Employee,Long> {
    @Override
    Iterable<Employee> findAllById(Iterable<Long> iterable);
}
