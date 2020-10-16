
import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./CustomerDashboard.css"
import { Link } from "react-router-dom";
import config from "../../config";
import { session, types } from "../../constants/types";

class CustomerDashboard extends Component {

  constructor() {
    super()

    this.state = {
      fname: '',
      lname: '',
      userName: '',
      phone: '',
      address: '',
      id: sessionStorage.getItem(session.ID),
      records: []
    }
  }

  componentDidMount() {
    this.updateCustomerDetails()
    this.updateBookingRecords()
  }

  updateCustomerDetails() {
    fetch(`${config.base}customer/${this.state.id}`, {
      headers: {
        Authorization: sessionStorage.getItem(session.TOKEN)
      }
    })
    .then(res => this.validateStatus(res))
    .then(res => res.json())
    .then(res => this.setState(res))
    .catch(this.errorHandler.bind(this))
  }

  updateBookingRecords() {
    fetch(`${config.base}enrollment`, {
      headers: {
        Authorization: sessionStorage.getItem(session.TOKEN)
      }
    })
    .then(res => this.validateStatus(res))
    .then(res => res.json())
    .then(res => {
      const filtered = res.filter(b => b.customer.id === this.state.id)
      const parsed = this.parseBooking(filtered)

      this.setState({
        records: parsed
      })
    })
    .catch(this.errorHandler.bind(this))
  }

  errorHandler(error) {
    if (error === 401) {
      this.props.history.push("/")
      sessionStorage.setItem(session.LOGIN, 0)
      sessionStorage.setItem(session.TYPE, types.credentials.DEFAULT)
      sessionStorage.setItem(session.NAME, types.credentials.DEFAULT)
      sessionStorage.setItem(session.TOKEN, types.credentials.DEFAULT)
      sessionStorage.setItem(session.ID, types.credentials.DEFAULT)
    } else console.dir(error)
  }

  validateStatus(response) {
    if (response.status >= 400) {
      throw response.status
    }

    return response
  }

  parseBooking(data) {
    return data.map((b, i) => {
      return (
        <tr 
          className="customer-dashboard-record" 
          onClick={() => { this.props.history.push(`/read/booking/${b.enrollmentId}`) }} 
          key={i}
        >
          <td>{b.employeeSchedule.availability}</td>
          <td>{this.convertTime(b.employeeSchedule.startingHour)}</td>
          <td>{b.enrollmentId}</td>
          <td>{b.employeeSchedule.employee.fname + " " + b.employeeSchedule.employee.lname}</td>
          <td>{b.employeeSchedule.skills.title}</td>
        </tr>
      )
    })
  }

  convertTime(time) {
    return time <= 12 ? time + " am" : (time - 12) + " pm"
  }

  render() {
    return (
      <div className="customer-dashboard-box">
      {/* HEADER */}
      <Header></Header>

      <div className="customer-dashboard-inner">
        <div className="customer-dashboard-container">
          
          {/* USER INFO */}
          <div className="customer-dashboard-personal-info">
            <h1>Hello, {this.state.fname}</h1>
            <div>
              <div className="customer-dashboard-data">
                <p className="customer-dashboard-title">First Name</p>
                <p className="customer-dashboard-title">Last Name</p>
                <p className="customer-dashboard-title">UserName</p>
              </div>
              <div className="customer-dashboard-data customer-dashboard-spacer">
                <p>{this.state.fname}</p>
                <p>{this.state.lname}</p>
                <p>{this.state.userName}</p>
              </div>
            </div>
            <div>
              <div className="customer-dashboard-data">
              <p className="customer-dashboard-title">ID</p>
                  <p className="customer-dashboard-title">Address</p>
                  <p className="customer-dashboard-title">Phone Number</p>
                </div>
                <div className="customer-dashboard-data">
                  <p>{this.state.id}</p>
                  <p>{this.state.address}</p>
                  <p>{this.state.phone}</p>
                </div>
            </div>
            <Link className="customer-dashboard-edit-btn" to={`/update/customer/${this.state.id}`}><span>Edit</span></Link>
          </div>

          {/* TABLE */}
          <div className="customer-dashboard-table-container">
            <table className="customer-dashboard-table1">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Skill</th>
                </tr>
                {this.state.records}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <Footer></Footer>
    </div>
    )
  }
}

export default CustomerDashboard;
