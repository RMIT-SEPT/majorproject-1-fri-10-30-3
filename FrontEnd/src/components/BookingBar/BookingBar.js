import React, { Component } from 'react'
import './BookingBar.css'
import Service from './../Service/Service'
import BookingDate from './../BookingDate/BookingDate'
import BookingConfirm from './../BookingConfirm/BookingConfirm'
import config from '../../config'
import { session, types } from "../../constants/types";
import { withRouter } from 'react-router-dom'


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

  componentDidMount () {      
    this.fetchServices(`${config.base}skills`).then(res => {
      this.setState({services: res})  
    })
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
    if (this.state.stage === 0 && this.state.services.length > 0) {  
      return (<div 
        id="landing-service-tab" 
        className="booking-bar-services" >
          {this.state.services}
        </div>
      )
    } else if (this.state.stage === 0 && this.state.services.length === 0) {
      return (<div className="booking-empty-services">
        <p>No Available Services</p>
      </div>)
    } else if (this.state.stage === 1) {
      return <BookingDate 
        incrementStage={this.incrementStage.bind(this)} 
        decrementStage={this.decrementStage.bind(this)} 
        errorBox={this.errorBox.bind(this)}
        data={this.state.selectedService}
      />
    } else if (this.state.stage === 2) {      
      return <BookingConfirm 
        decrementStage={this.decrementStage.bind(this)} 
        data={this.state.selectedService}
        loggedIn={this.state.signedIn}
      />
    } 
  }

  async fetchServices(url) {
    
    const raw = await fetch(url, {
        headers: {
          Authorization: sessionStorage.getItem(session.TOKEN)
        }
      })
      .then(this.validateStatus)
      .then(res => res.json())
      .catch(err => this.errorHandler.bind(this))
    const error = raw['error'] !== undefined && raw['error']

    return error ? this.errorBox() : this.mapService(raw);
  }

  validateStatus(response) {
    if (response.status >= 400) {
      throw response.status
    }

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
    } else return {error: true, message: error.message}
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

export default withRouter(BookingBar)