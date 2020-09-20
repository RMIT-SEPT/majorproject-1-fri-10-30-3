
import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./CustomerDashboard.css"
import { Link } from "react-router-dom";

class CustomerDashboard extends Component {

  constructor() {
    super()

    this.state = {
      fname: '',
      lname: '',
      userName: '',
      password: '',
      id: 3,
      records: []
    }
  }

  componentDidMount() {
    this.updateCustomerDetails()
    this.updateBookingRecords()
  }

  updateCustomerDetails() {
    fetch(`http://localhost:8080/api/customer/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState(res)
      })
  }

  updateBookingRecords() {
    fetch(`http://localhost:8080/api/enrollment`)
      .then(res => res.json())
      .then(res => {
        const filtered = res.filter(b => b.customer.id === this.state.id)
        const parsed = this.parseBooking(filtered)

        this.setState({
          records: parsed
        })
      })
  }

  parseBooking(data) {
    return data.map((b, i) => {
      return (
        <tr 
          className="customer-dashboard-record" 
          onClick={() => { this.props.history.push(`/read/booking/${b.enrollmentId}`) }} 
          key={i}
        >
          <td>{b.employee_schedule.availability}</td>
          <td>{this.convertTime(b.employee_schedule.startingHour)}</td>
          <td>{b.enrollmentId}</td>
          <td>{b.employee_schedule.employee.fname + " " + b.employee_schedule.employee.lname}</td>
          <td>{b.employee_schedule.skills.title}</td>
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
                  <p className="customer-dashboard-title">Password</p>
                  <p className="customer-dashboard-title">Address</p>
                  <p className="customer-dashboard-title">UserName</p>
                </div>
                <div className="customer-dashboard-data">
                  <p>{this.state.password}</p>
                  <p>123 Street, Melb, Vic</p>
                  <p>+61 123 123 123</p>
                </div>
            </div>
            <Link className="customer-dashboard-edit-btn" to={`/update/customer${this.state.id}`}><span>Edit</span></Link>
          </div>

          {/* TABLE */}
          <div className="customer-dashboard-table-container">
            <table className="customer-dashboard-table">
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
