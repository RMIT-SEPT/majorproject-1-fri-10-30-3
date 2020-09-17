import React, { Component } from "react";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import TimeSlotTable from "../TimeSlotTable/TimeSlotTable";
import "./CustomerDashboard.css"

class EditDashboard extends Component {

  render() {
    return (
      <div className="customer-dashboard-box">
      {/* HEADER */}
      <Header></Header>

      <div className="customer-dashboard-container">
        <div className="personal-info">
          <div className="box-title">
            <div className="personal-info-inner">

              {/* EDIT User Information ~ Will be added elsewhere later on, leaving here for now */}
              <form id="update-info">
                <div class="grid-container">
                  <div class="grid-item user-hello"><h1>TEST</h1><br></br>Update your personal details below.</div>
                  <div class="grid-item">First Name:<br></br><input type="text" id="firstname" name="firstname" placeholder="Enter new first name."></input></div>
                  <div class="grid-item">Last Name:<br></br><input type="text" id="lastname" name="lastname" placeholder="Enter new surname."></input></div>  
                  <div class="grid-item">Contact Number:<br></br><input type="text" id="phone" name="phone" placeholder="Enter new phone number."></input></div>
                  <div class="grid-item">Username:<br></br><input type="text" id="username" name="username"></input></div>
                  <div class="grid-item">Password:<br></br><input type="password" id="password" name="password"></input></div>
                  <div class="grid-item">Address:<br></br><input type="text" id="address" name="address" placeholder="123 Fake Street, VIC"></input></div>
                  <div class="grid-item item-error">*If error occurs, it will be shown here.</div>
                  <div class="grid-item"></div>
                  <div class="grid-item"><button className="button-interact button-solid">Confirm</button></div>  
                  <div class="grid-item"><button className="button-interact button-solid">Cancel</button></div>  
                </div>
              </form>
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

export default EditDashboard;
