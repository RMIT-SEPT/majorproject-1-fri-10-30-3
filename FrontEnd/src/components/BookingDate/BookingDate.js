import React, { Component } from 'react'
import './BookingDate.css'
import BookingTime from './../BookingTime/BookingTime'
import config from '../../config'

class BookingDate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      timeSlots: [],
      timeSelected: false,
      bookingDate: null,
      bookingTime: null,
      selectedId: null,
      activateNext: "booking-next-disable"
    }
  }
  
  timeSelected(id, selectedTime) {
    this.setState({timeSlots: this.state.timeSlots.map(time => {
      const selected = time.props.id === id

      if (selected) {
        this.setState({
          timeSelected: true,
          selectedId: time.props.id,
          bookingTime: selectedTime,
          activateNext: ""
        })
      }
      
      return (
          <BookingTime 
            onClick={this.timeSelected.bind(this)} 
            selected={selected} 
            id={time.props.id} 
            key={time.key} 
            time={time.props.time} 
            remaining={time.props.remaining} 
            instructor={time.props.instructor}
          />
        )
      })
    })
  }

  dateChanged() {
    this.setState({
      timeSelected: false,
      selectedId: null,
      instructor: null,
      bookingDate: null,
      bookingTime: null,
      activateNext: "booking-next-disable",
    })
  }

  updateTime(event) {
    this.dateChanged()
    
    this.setState({
      bookingDate: event.currentTarget.value
    })

    this.fetchTime(`${config.base}schedule`)
      .then(res => {
        this.setState({timeSlots: res})  
      })
  }

  async fetchTime(url) {
    const raw = await fetch(url)
      .then(res => res.json())
      .catch(err => { return {error: true, message: err.message} })
    const error = raw['error'] !== undefined && raw['error']

    return error ? this.props.errorBox() : this.flatMapTime(raw);
  }

  flatMapTime(raw) {
    return raw
      .filter(data => data.skills.skillId === this.props.data.id && data.availability === this.state.bookingDate)
      .sort((a, b) => {
        if (a.startingHour > b.startingHour) {
          return 1
        } else if (a.startingHour < b.startingHour) {
          return -1
        } else {
          return 0
        }
      })
      .map((data, index) => {
        return <BookingTime 
          id={data.scheduleId} 
          onClick={this.timeSelected.bind(this)} 
          key={index} 
          time={data.startingHour} 
          remaining={data.remaining} 
          instructor={data.employee.fname + " " + data.employee.lname}
        /> 
      })
  }

  nextStage() {
    this.props.data.bookingId = this.state.selectedId
    this.props.incrementStage(this.props.data)
  }

  render() {
    return (
      <div id="landing-date-tab"> {/* Dates */}     
        <div className="booking-dates-container">
          <div className="booking-dates-content">
            <div className="booking-dates-fields">
              
              <div>
                <p className="ff-off-black booking-date-title">{this.props.data.title}</p>
                <p>Please select a booking date</p>
                <input className="booking-date-picker" type="date" min={(new Date()).toLocaleDateString().split("/").reverse().join("-")} onChange={this.updateTime.bind(this)}></input>
              </div>

            </div>
            <div className="booking-dates-time">
              {this.state.timeSlots}
            </div>

            <div className="booking-dates-actions">
                <button className={"booking-date-btn booking-date-next " + this.state.activateNext} onClick={this.nextStage.bind(this)}>Select</button>
                <button className="booking-date-btn booking-date-back" onClick={this.props.decrementStage}>Back</button>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

export default BookingDate