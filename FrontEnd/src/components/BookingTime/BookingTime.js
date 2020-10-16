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
    this.props.onClick(this.props.id, this.props.time)
  }

  render() {
    const selectedColour = "booking-time-selection " + (this.props.selected ? "booking-selected " : "")
    const time = this.props.time <= 12 ? this.props.time + ":00 am" : (this.props.time - 12) + ":00 pm"

    return (
      <div onClick={this.onClick.bind(this)} className={selectedColour + this.state.rowColour}>
        <div>
          <div>{time} - <span className="booking-time-spots">{this.props.remaining} Spots</span></div>
        </div>
        <div>{this.props.instructor}</div>
      </div>
    )
  }

}

export default BookingTime