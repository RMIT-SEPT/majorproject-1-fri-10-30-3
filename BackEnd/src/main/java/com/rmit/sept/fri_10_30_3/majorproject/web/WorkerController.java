package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Worker;
import com.rmit.sept.fri_10_30_3.majorproject.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/worker")
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    @PostMapping("")
    public ResponseEntity<Worker> createNewWorker(@RequestBody Worker worker){
        Worker newWorker = workerService.saveOrUpdateCustomer(worker);
        return new ResponseEntity<Worker>(worker, HttpStatus.CREATED);
    }
}
