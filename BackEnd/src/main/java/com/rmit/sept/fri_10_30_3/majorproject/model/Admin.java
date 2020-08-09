package com.rmit.sept.fri_10_30_3.majorproject.model;
import javax.persistence.*;

@Entity
@DiscriminatorValue("admin")
public class Admin extends Person{
    private String companyName;
}
