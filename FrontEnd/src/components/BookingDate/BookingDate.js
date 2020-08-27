import React, { Component } from 'react'
import './BookingDate.css'
import BookingTime from './../BookingTime/BookingTime'

class BookingDate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      timeSlots: [],
      instructors: [],
      timeSelected: false,
      instructorSelected: false,
      selectedId: null,
      activateNext: "booking-next-disable"
    }
  }
  
  timeSelected(id) {
    this.setState({timeSlots: this.state.timeSlots.map(time => {
      const selected = time.props.id === id

      if (selected) {
        this.setState({
          timeSelected: true,
          selectedId: time.props.id
        })

        this.updateInstructors()
      }
      
      return (
          <BookingTime 
            onClick={this.timeSelected.bind(this)} 
            selected={selected} 
            id={time.props.id} 
            key={time.key} 
            time={time.props.time} 
            remaining={time.props.remaining} 
          />
        )
      })
    })
  }

  dateChanged() {
    this.setState({
      timeSelected: false,
      instructorSelected: false,
      selectedId: null,
      activateNext: "booking-next-disable",
      instructors: []
    })
  }

  updateInstructors() {
    // TODO: Implement fetch request for instructors
    const randomNames = ['Arone Foo', 'Dylan Bar', 'Todd Baz', 'Man Foo', 'Tien Bar', 'Mr Smith', 'Lucy Lu', 'Hey Now']

    this.setState({
      instructors: [
        <option key={0}>{randomNames[Math.floor(Math.random() * (randomNames.length - 1))]}</option>,
        <option key={1}>{randomNames[Math.floor(Math.random() * (randomNames.length - 1))]}</option>,
        <option key={2}>{randomNames[Math.floor(Math.random() * (randomNames.length - 1))]}</option>,
      ]
    })
  }

  updateTime() {
    this.dateChanged()

    const tempTime = [
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={0} id={0} key={0} time="10:00 am" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={1} id={1} key={1} time="11:00 am" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={2} id={2} key={2} time="12:00 am" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={3} id={3} key={3} time="1:00 pm" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={4} id={4} key={4} time="2:00 pm" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={5} id={5} key={5} time="3:00 pm" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={6} id={6} key={6} time="4:00 pm" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={7} id={7} key={7} time="5:00 pm" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={8} id={8} key={8} time="6:00 pm" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={9} id={9} key={9} time="7:00 pm" remaining={4} />,
      <BookingTime onClick={this.timeSelected.bind(this)} selected={false} index={10} id={10} key={10} time="8:00 pm" remaining={4} />
    ]

    

    // TODO: Add API to fetch and include relevent request object.
    this.fetchTime("http://localhost:3000").then(res => {
      this.setState({timeSlots: tempTime})  
    })
  }

  async fetchTime(url) {
    const raw = await fetch(url)
      .then(res => res.json())
      .catch(err => { return {error: true, message: err.message} })
    const error = raw['error'] !== undefined && raw['error']

    return error ? this.props.errorBox() : this.mapTime(raw);
  }

  mapTime(raw) {
    return raw.map(data => {
      return <BookingTime time={data.time} remaining={data.remaining} /> 
    })
  }

  instructorSelected() {
    this.setState({
      instructorSelected: true,
      activateNext: ""
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
                <p>Please select a booking date and time.</p>
                <input id="cow" className="booking-date-picker" type="date" onChange={this.updateTime.bind(this)}></input>
                <p>Available Instructors</p>
                <select onChange={this.instructorSelected.bind(this)} className="booking-date-instructor">
                  {this.state.instructors}
                </select>
              </div>
              
              <div className="booking-dates-actions">
                <button className={"booking-date-btn booking-date-next " + this.state.activateNext} onClick={this.nextStage.bind(this)}>Select</button>
                <button className="booking-date-btn booking-date-back" onClick={this.props.decrementStage}>Back</button>
              </div>

            </div>
            <div className="booking-dates-time">
              {this.state.timeSlots}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default BookingDate