import React, { Component } from 'react'
import './BookingConfirm.css'
import './../BookingBar/BookingBar.css'
import config from '../../config'

class BookingConfirm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: props.loggedIn,
      signUp: true,
      errorElememnt: null,
      instructor: null,
      date: null,
      time: null,
    }
  }

  componentDidMount() {
    fetch(`${config.base}schedule/${this.props.data.bookingId}`)
      .then(res => res.json())
      .then(res => this.setState({
        instructor: res.employee.fname + " " + res.employee.lname,
        date: res.availability,
        time: res.startingHour <= 12 ? res.startingHour + ":00 am" : (res.startingHour - 12) + ":00 pm"
      }))
  }

  confirmBooking() {

    const data = {
      customer: { id: 3 },
      employee_schedule: { scheduleId: this.props.data.bookingId }
    }

    fetch(`${config}enrollment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .catch(err => console.dir(err))
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
        <input required type="text" className="booking-signup-input" placeholder="First Name"></input>
        <input required type="text" className="booking-signup-input" placeholder="Last Name"></input>
        <input required type="email" className="booking-signup-input" placeholder="Email"></input>
        <input required type="text" className="booking-signup-input" placeholder="Username"></input>
        <input required type="password" className="booking-signup-input" placeholder="Password"></input>
        <p className="booking-signup-subtext">Already a member? <span onClick={this.switchToLogin.bind(this)}>Log In</span></p>
        <div className="booking-signup-actions">
          <button className="booking-signup-btn" onClick={this.props.decrementStage}>Back</button>
          <button onClick={this.confirmBooking.bind(this)} className="booking-signup-btn">Sign Up & Book</button>
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
        <input required type="text" className="booking-signup-input" placeholder="Username"></input>
        <input required type="password" className="booking-signup-input" placeholder="Password"></input>
        <p className="booking-signup-subtext">Need an account? <span onClick={this.switchToSignup.bind(this)} >Sign Up</span></p>
        <div className="booking-signup-actions">
          <button className="booking-signup-btn" onClick={this.props.decrementStage}>Back</button>
          <button className="booking-signup-btn">Log In & Book</button>
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
        <p className="booking-signup-title">Welcome back, <span className="ff-yellow">FooBar</span></p>
        <p className="booking-summary-description">If you're happy with the booking details to the left, hut the button below to continue.</p>
        <div className="booking-signup-actions">
          <button className="booking-signup-btn" onClick={this.props.decrementStage}>Back</button>
          <button className="booking-signup-btn">Book Now</button>
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

export default BookingConfirm