import React, { Component } from 'react'
import './BookingConfirm.css'
import './../BookingBar/BookingBar.css'

class BookingConfirm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: props.loggedIn,
      signUp: true,
      errorElememnt: null
    }
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
        <input className="booking-signup-input" placeholder="First Name"></input>
        <input className="booking-signup-input" placeholder="Last Name"></input>
        <input className="booking-signup-input" placeholder="Email"></input>
        <input className="booking-signup-input" placeholder="Username"></input>
        <input className="booking-signup-input" placeholder="Password"></input>
        <p className="booking-signup-subtext">Already a member? <span onClick={this.switchToLogin.bind(this)}>Log In</span></p>
        <div className="booking-signup-actions">
          <button className="booking-signup-btn" onClick={this.props.decrementStage}>Back</button>
          <button className="booking-signup-btn">Sign Up & Book</button>
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
        <input className="booking-signup-input" placeholder="Username"></input>
        <input className="booking-signup-input" placeholder="Password"></input>
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
              <p className="booking-summary-details" >Instructor: <span>{this.props.data.instructor}</span></p>
              <p className="booking-summary-details" >Date: <span>{this.props.data.date}, {this.props.data.time}</span></p>
              <div className="booking-summary-values-content">
                <p className="booking-summary-values">{this.props.data.length}</p>
                <p className="booking-summary-values">{this.props.data.cost}</p>
              </div>
            </div>
            {this.manageCheckoutState()}
          </div>
      </div>
    )
  }

}

export default BookingConfirm