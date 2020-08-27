package com.rmit.sept.fri_10_30_3.majorproject.model;
import javax.persistence.*;

@Entity
@DiscriminatorValue("admin")
public class Admin extends Person{
    private String companyName;

    public Admin() {
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }


}
