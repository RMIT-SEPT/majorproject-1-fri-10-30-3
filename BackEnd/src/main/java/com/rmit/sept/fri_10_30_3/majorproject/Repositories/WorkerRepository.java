package com.rmit.sept.fri_10_30_3.majorproject.Repositories;

import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.model.Worker;
import org.springframework.data.repository.CrudRepository;

public interface WorkerRepository extends CrudRepository<Worker,Long> {
    @Override
    Iterable<Worker> findAllById(Iterable<Long> iterable);
}
