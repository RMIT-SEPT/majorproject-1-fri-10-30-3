import React, { Component } from 'react'
import config from '../../config'
import { session, types } from '../../constants/types'
import { withRouter } from 'react-router-dom'

import './BookingConfirm.css'
import './../BookingBar/BookingBar.css'

class BookingConfirm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: Number.parseInt(sessionStorage.getItem(session.LOGIN)),
      signUp: true,
      errorElememnt: null,
      instructor: null,
      date: null,
      time: null,
    }
  }

  componentDidMount() {
    fetch(`${config.base}schedule`, {
      Authorization: sessionStorage.getItem(session.TOKEN)
    })
      .then(res => this.validateStatus(res))
      .then(res => res.json())
      .then(res => Array.isArray(res) ? res : [res])
      .then(res => res.filter(p => p.scheduleId === this.props.data.bookingId))
      .then(res => {
        this.setState({
          instructor: res[0].employee.fname + " " + res[0].employee.lname,
          date: res[0].availability,
          time: res[0].startingHour <= 12 ? res[0].startingHour + ":00 am" : (res[0].startingHour - 12) + ":00 pm"
        })
      })
      .catch(this.errorHandler.bind())
  }

  async createBooking() {
    const data = {
      customer: { id: sessionStorage.getItem(session.ID) },
      employeeSchedule: { scheduleId: this.props.data.bookingId }
    }

    await fetch(`${config.base}enrollment`, {
      method: "POST",
      headers: { 
        Authorization: sessionStorage.getItem(session.TOKEN),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => this.validateStatus(res))
    .catch(err => this.errorHandler.bind(this))

    this.props.history.push(`/dashboard/${sessionStorage.getItem(session.TYPE)}/${sessionStorage.getItem(session.ID)}`)
  }

  async customerCreation() {
    const data = document.querySelectorAll(".booking-signup-input")

    await fetch(config.base + "customer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: data[0].value,
        lname: data[1].value,
        address: data[2].value,
        phone: data[3].value,
        userName: data[4].value,
        password: data[5].value,
        confirmPassword: data[6].value
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else throw res.status
    })
    .then(res => {
      sessionStorage.setItem(session.LOGIN, 0)
      sessionStorage.setItem(session.TYPE, types.credentials.DEFAULT)
      sessionStorage.setItem(session.NAME, types.credentials.DEFAULT)
      sessionStorage.setItem(session.TOKEN, types.credentials.DEFAULT)
      sessionStorage.setItem(session.ID, types.credentials.DEFAULT)
      this.loginAndBook()
    })
  }

  loginAndBook() {
    const data = Array.from(document.querySelectorAll(".booking-signup-input")).filter(p => p.title === "password" || p.title === "userName")
    const username = data[0].value
    const password = data[1].value 

    fetch(config.base + "customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: username,
        password: password
      })
    })
    .then(this.validateStatus)
    .then(res => res.json())
    .then(res => this.storeUpdates(res, username))
    .then(res => this.storePersonUpdates(res, username))
    .then(res => { this.createBooking() })
    .catch(err => this.errorHandler.bind(this))
  }

  storeUpdates(response) {
    sessionStorage.setItem(session.LOGIN, 1)
    sessionStorage.setItem(session.TYPE, response.type)
    sessionStorage.setItem(session.TOKEN, response.token)

    return response
  }

  async storePersonUpdates(response, username) {
    await fetch(config.base + "customer/", {
      headers: {
        Authorization: response.token
      }
    })
    .then(res => res.json())
    .then(res => Array.isArray(res) ? res : [res])
    .then(res => res.filter(p => p.userName === username))
    .then(res => {
      sessionStorage.setItem(session.NAME, res[0].fname)
      sessionStorage.setItem(session.ID, res[0].id)
    })

    return response
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

  switchToLogin() {
    this.setState({
      signUp: false
    })
  }

  switchToSignup() {
    this.setState({
      signUp: true
    })
  }
  
  userSignup() {
    return (
      <div className="booking-signin-content">
        <p className="booking-signup-title">Sign Up</p>
        <input title="fname" required type="text" className="booking-signup-input" placeholder="First Name"></input>
        <input title="lname" required type="text" className="booking-signup-input" placeholder="Last Name"></input>
        <input title="address" required type="text" className="booking-signup-input" placeholder="Address"></input>
        <input title="phone" required type="number" className="booking-signup-input" placeholder="Phone"></input>
        <input title="userName" required type="text" className="booking-signup-input" placeholder="Username"></input>
        <input title="password" required type="password" className="booking-signup-input" placeholder="Password"></input>
        <input title="confirmPassword" required type="password" className="booking-signup-input" placeholder="Confirm Password"></input>
        <p className="booking-signup-subtext">Already a member? <span onClick={this.switchToLogin.bind(this)}>Log In</span></p>
        <div className="booking-signup-actions">
          <button className="booking-signup-btn" onClick={this.props.decrementStage}>Back</button>
          <button onClick={this.customerCreation.bind(this)} className="booking-signup-btn">Sign Up & Book</button>
        </div>
        <div>
          {this.state.errorElememnt}
        </div>
      </div>
    )
  }

  userLogin() {
    return (
      <div className="booking-signin-content">
        <p className="booking-signup-title">Log In</p>
        <input title="userName" required type="text" className="booking-signup-input" placeholder="Username"></input>
        <input title="password" required type="password" className="booking-signup-input" placeholder="Password"></input>
        <p className="booking-signup-subtext">Need an account? <span onClick={this.switchToSignup.bind(this)} >Sign Up</span></p>
        <div className="booking-signup-actions">
          <button className="booking-signup-btn" onClick={this.props.decrementStage}>Back</button>
          <button onClick={this.loginAndBook.bind(this)} className="booking-signup-btn">Log In & Book</button>
        </div>
        <div>
          {this.state.errorElememnt}
        </div>
      </div>
    )
  }

  userLoggedIn() {
    return (
      <div className="booking-signin-content">
        <p className="booking-signup-title">Welcome back, <span className="ff-yellow">{sessionStorage.getItem(session.NAME)}</span></p>
        <p className="booking-summary-description">If you're happy with the booking details to the left, hit the 'Book Now' button below to continue.</p>
        <div className="booking-signup-actions">
          <button className="booking-signup-btn" onClick={this.props.decrementStage}>Back</button>
          <button onClick={this.createBooking.bind(this)} className="booking-signup-btn">Book Now</button>
        </div>
      </div>
    )
  }

  manageCheckoutState() {
    let state;

    if (!this.state.loggedIn && this.state.signUp) {
      state = this.userSignup()
    } else if (!this.state.loggedIn && !this.state.signUp) {
      state = this.userLogin()
    } else {
      state = this.userLoggedIn()
    }

    return state
  }

  render() {
    return (
      <div className="landing-booking-tab"> {/* Book */} 
          <div className="booking-confirm-container">
            <div className="booking-summary-content">
              <p className="booking-summary-title">Booking Summary</p>
              <img alt={this.props.data.title} src={this.props.data.imageSrc}></img>
              <p className="booking-summary-sub-title">{this.props.data.title}</p>
              <p className="booking-summary-description">{this.props.data.description}</p>
              <p className="booking-summary-details" >Instructor: <span>{this.state.instructor}</span></p>
              <p className="booking-summary-details" >Date: <span>{this.state.date}, {this.state.time}</span></p>
              <div className="booking-summary-values-content">
                <p className="booking-summary-values">{this.props.data.length} hr</p>
                <p className="booking-summary-values">${this.props.data.cost}</p>
              </div>
            </div>
            {this.manageCheckoutState()}
          </div>
      </div>
    )
  }

}

export default withRouter(BookingConfirm)