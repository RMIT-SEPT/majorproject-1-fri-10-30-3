package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.WorkerRepository;
import com.rmit.sept.fri_10_30_3.majorproject.model.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;

    public Worker saveOrUpdateCustomer(Worker worker){
        return workerRepository.save(worker);
    }
}
