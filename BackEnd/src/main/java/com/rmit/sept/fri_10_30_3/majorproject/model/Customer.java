package com.rmit.sept.fri_10_30_3.majorproject.model;

import javax.persistence.*;
@Entity
@DiscriminatorValue("customer")
public class Customer extends Person{
    private String phone;
}
