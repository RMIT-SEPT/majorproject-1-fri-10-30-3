package com.rmit.sept.fri_10_30_3.majorproject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long skillId;

    private String skillsName;

    //Added on 10/09/2020
    private String title;
    private String imageSrc;
    private String description;
    private int length;
    private double cost;

    public Set<EmployeeSchedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<EmployeeSchedule> schedules) {
        this.schedules = schedules;
    }

    @OneToMany(mappedBy = "skills", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<EmployeeSchedule> schedules;

    //Basic Many-To-Many
//    @ManyToMany(mappedBy = "services")
//    Set<Employee> employees;

    public Skills() {
    }

    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date created_At;
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date updated_At;

    public long getSkillId() {
        return skillId;
    }

    public void setSkillId(long service_id) {
        this.skillId = service_id;
    }

    public String getSkillsName() {
        return skillsName;
    }

    public void setSkillsName(String service_name) {
        this.skillsName = service_name;
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

    //Getter and Setter for the fields that was added on 10/09/2020
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}

