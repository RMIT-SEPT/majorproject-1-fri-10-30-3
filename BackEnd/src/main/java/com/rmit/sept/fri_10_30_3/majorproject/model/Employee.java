package com.rmit.sept.fri_10_30_3.majorproject.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@DiscriminatorValue("employee")
public class Employee extends Person{

    private String fname;
    private String lname;

    public Employee() {
    }

    public Set<Employee_Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<Employee_Schedule> schedules) {
        this.schedules = schedules;
    }

    @OneToMany(mappedBy = "employee")
    Set<Employee_Schedule> schedules;
    //Basic Many-To-Many
//    @ManyToMany
//    @JoinTable(
//            name = "Employee_Schedule",
//            joinColumns = @JoinColumn(name = "Employee"),
//            inverseJoinColumns = @JoinColumn(name = "Service_id"))
//    Set<Service> services;

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
