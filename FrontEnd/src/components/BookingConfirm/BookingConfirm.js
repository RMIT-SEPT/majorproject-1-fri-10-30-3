import React, { Component } from 'react'
import './BookingConfirm.css'
import './../BookingBar/BookingBar.css'

class BookingConfirm extends Component {

  render() {
    return (
      <div id="landing-booking-tab"> {/* Book */} 
          <div> {/* New Sign Up */} </div>
          <div> {/* Dates */} </div>
          <div> {/* Dates */} </div>
          <button onClick={this.props.decrementStage.bind(this)}>back</button>
        </div>
    )
  }

}

export default BookingConfirm