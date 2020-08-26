import React, { Component } from 'react'
import './BookingTime.css'

class BookingTime extends Component {

  render() {
    return (
      <div className="booking-time-selection">
        <div>{this.props.time}</div>
        <div className="booking-time-spots">{this.props.remaining} Spots</div>
      </div>
    )
  }

}

export default BookingTime