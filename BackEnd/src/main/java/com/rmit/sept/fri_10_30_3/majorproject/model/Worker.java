package com.rmit.sept.fri_10_30_3.majorproject.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("worker")
public class Worker extends Person{
    private String department;
}
