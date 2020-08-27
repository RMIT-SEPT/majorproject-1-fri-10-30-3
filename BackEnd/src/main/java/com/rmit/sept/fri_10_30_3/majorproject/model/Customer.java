package com.rmit.sept.fri_10_30_3.majorproject.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@DiscriminatorValue("customer")
public class Customer extends Person{
    private String fname;
    private String lname;

    @OneToMany(mappedBy = "customer")
    Set<Enrollment> enrollments;

    public Customer() {
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }


    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }
}
