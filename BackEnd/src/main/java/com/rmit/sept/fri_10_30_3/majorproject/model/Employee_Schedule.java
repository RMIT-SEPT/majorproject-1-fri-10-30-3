package com.rmit.sept.fri_10_30_3.majorproject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Employee_Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long scheduleId;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "skills_id")
    private Skills skills;

    private int capacity;
    private double price;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date availability;
    //the time that booking starts(e.g. 1am is 1, 1pm is 13. The range is 0 to 23)
    @Range(min=0,max=23,message = "The range of startinghour is 0 to 23")
    private int startingHour;
    //the length of the booking.(Hours)
    @Range(min=0,max=23,message = "The range of length is 0 to 23")
    private int length;

    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date created_At;
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date updated_At;

    public long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(long id) {
        this.scheduleId = id;
    }

    public int getStartingHour() {
        return startingHour;
    }

    public void setStartingHour(int startingHour) {
        this.startingHour = startingHour;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public Date getAvailability() {
        return availability;
    }

    public void setAvailability(Date availability) {
        this.availability = availability;
    }

    public Employee_Schedule() {
    }


    public Skills getSkills() {
        return skills;
    }

    public void setSkills(Skills skills) {
        this.skills = skills;
    }


    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }
}
