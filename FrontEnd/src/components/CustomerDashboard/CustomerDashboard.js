import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TimeSlotTable from "../TimeSlotTable/TimeSlotTable";
import "./CustomerDashboard.css"

class CustomerDashboard extends Component {

  render() {
    return (
      <div className="customer-dashboard-box">
      {/* HEADER */}
      <Header></Header>

      <div className="customer-dashboard-container">
        <div className="personal-info">
          <div className="box-title">

            {/* USER INFO */}
            <p className="personal-info-title">Personal Information</p>
            <div className="personal-info-inner">       
              <div className="grid-container">
                <div className="grid-item user-hello"><h1>Hello, User</h1><br></br>Update your personal details below.</div>
                <div className="grid-item"><strong>First Name:</strong><br></br>Foo</div>
                <div className="grid-item"><strong>Last Name:</strong><br></br>Bar</div>  
                <div className="grid-item"><strong>Contact Number:</strong><br></br>+61 123 123 123</div>
                <div className="grid-item"><strong>Username:</strong><br></br>FooBarBazz</div>
                <div className="grid-item"><strong>Password:</strong><br></br>********</div>
                <div className="grid-item"><strong>Address:</strong><br></br>123 Somethine Road</div>
                <div className="grid-item"><button onClick="">Edit</button></div> 
                <div className="grid-item"></div>  
                <div className="grid-item"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="customer-tables">
          <p className="personal-info-title">Booking Information</p>
          <TimeSlotTable />
        </div>
      </div>

      {/* FOOTER */}
      <Footer></Footer>
    </div>
    )
  }
}

export default CustomerDashboard;
