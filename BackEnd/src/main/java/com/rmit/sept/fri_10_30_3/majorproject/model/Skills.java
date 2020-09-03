package com.rmit.sept.fri_10_30_3.majorproject.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long skills_id;

    private String skills_name;

    public Set<Employee_Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<Employee_Schedule> schedules) {
        this.schedules = schedules;
    }

    @OneToMany(mappedBy = "skills")
    private Set<Employee_Schedule> schedules;

    //Basic Many-To-Many
//    @ManyToMany(mappedBy = "services")
//    Set<Employee> employees;

    public Skills() {
    }

    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date created_At;
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date updated_At;

    public long getSkills_id() {
        return skills_id;
    }

    public void setSkills_id(long service_id) {
        this.skills_id = service_id;
    }

    public String getSkills_name() {
        return skills_name;
    }

    public void setSkills_name(String service_name) {
        this.skills_name = service_name;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
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

