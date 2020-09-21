import React, { Component } from 'react'
import './BookingBar.css'
import Service from './../Service/Service'
import BookingDate from './../BookingDate/BookingDate'
import BookingConfirm from './../BookingConfirm/BookingConfirm'
import config from '../../config'


class BookingBar extends Component {

  constructor () {
    super()

    this.state = {
      stage: 0,
      signedIn: false,
      displaySignUp: true,
      services: (<p><i className="ff-yellow booking-loading-icon fas fa-spinner fa-pulse"></i></p>),
      selectedService: {},
    }
  }

  incrementStage(data) {
    this.setState({ 
      stage: this.state.stage + 1,
      selectedService: data
    }) 
  }

  decrementStage() {
    this.setState({stage: this.state.stage - 1}) 
  }

  stageManager() {
    let stage;

    if (this.state.stage === 0) {  
      stage = (
        <div id="landing-service-tab" className="booking-bar-services" > {/* Services */}
          {this.state.services}
        </div>
      )
    } else if (this.state.stage === 1) {
      stage = 
        <BookingDate 
          incrementStage={this.incrementStage.bind(this)} 
          decrementStage={this.decrementStage.bind(this)} 
          errorBox={this.errorBox.bind(this)}
          data={this.state.selectedService}
        />
    } else if (this.state.stage === 2) {      
      stage = 
        <BookingConfirm 
          decrementStage={this.decrementStage.bind(this)} 
          data={this.state.selectedService}
          loggedIn={this.state.signedIn}
        />
    } 

    return stage;
  }

  componentDidMount () {    
    this.fetchServices(`${config.base}skills`).then(res => {
      this.setState({services: res})  
    })
  }

  async fetchServices(url) {
    
    const raw = await fetch(url)
      .then(res => res.json())
      .catch(err => { return {error: true, message: err.message} })
    const error = raw['error'] !== undefined && raw['error']

    return error ? this.errorBox() : this.mapService(raw);
  }

  mapService(data) {
    return data.map(service => {
      return (<Service 
        key={service.skillId}
        id={service.skillId}
        title={service.title} 
        description={service.description} 
        imageSrc={service.imageSrc} 
        length={service.length} 
        cost={service.cost} 
        onClick={this.incrementStage.bind(this)}
      />)
    })
  }

  currentTab(stage) {
    return "booking-transition-text " + (
      this.state.stage === stage ? 
        "booking-current" : 
        ""
    )
  }

  errorBox() {
    return (
      <div className="booking-error-box">
        <p className="booking-sad-face">Oh no.. :(</p>
        <p>It looks like there was an issue getting our services, please try again later.</p>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="booking-transiton-container"> {/* Transitional Bar */} 
          <div className="booking-transiton-content">
            <p className={this.currentTab(0)}>Services</p>
            <div><i className="ff-gray booking-transition-icon fas fa-angle-double-right"></i></div>
            <p className={this.currentTab(1)}>Dates</p>
            <div><i className="ff-gray booking-transition-icon fas fa-angle-double-right"></i></div>
            <p className={this.currentTab(2)}>Booking</p>
          </div>
        </div>
        
        <div> {/* Main Block */} 
          {this.stageManager()}
        </div>
      </div>
    )
  }

}

export default BookingBar