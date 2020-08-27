import React, { Component } from 'react'
import './BookingTime.css'

class BookingTime extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      rowColour: props.index % 2 === 0 ? "booking-odd-row" : ""
    }
  }

  onClick() {
    this.props.onClick(this.props.id)
  }

  render() {
    const selectedColour = "booking-time-selection " + (this.props.selected ? "booking-selected " : "")

    return (
      <div onClick={this.onClick.bind(this)} className={selectedColour + this.state.rowColour}>
        <div>{this.props.time}</div>
        <div className="booking-time-spots">{this.props.remaining} Spots</div>
      </div>
    )
  }

}

export default BookingTime