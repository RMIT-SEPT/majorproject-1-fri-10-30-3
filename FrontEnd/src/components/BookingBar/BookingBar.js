import React, { Component } from 'react'
import './BookingBar.css'
import Service from './../Service/Service'

class BookingBar extends Component {

  constructor () {
    super()

    this.state = {
      stage: 0,
      signedIn: false,
      services: (<p>Loading..</p>)
    }

  }

  componentDidMount () {
    const tempServices = [
      <Service 
      key={1}
      title={"Zumba Session"} 
      description={"Lorem  ipsum  dolor sit am et, consectetur adipiscing elit. Maecenas volutpat eu velit in euism od. Proin vitae egestas ante, ac aliquam  risus. Donec congue m i ut tristique dignissim . Vivam us non diam  ut ligula ornare sem per."} 
      imageSrc={"/services/zumba.jpg"} 
      length={"1hr"} 
      cost={"$90"} 
      />,
      <Service 
      key={2}
      title={"Karate Session"} 
      description={"Sed ultrices volutpat nibh vitae scelerisque. Vestibulum  ante ipsum  prim is in faucibus orci luctus et ultrices posuere cubilia curae."} 
      imageSrc={"/services/karate.jpg"} 
      length={"1hr"} 
      cost={"$90"}
      />,
      <Service 
      key={3}
      title={"MMA Session"} 
      description={"Donec et euism od arcu, vel ultrices orci. Mauris nec lorem  id dui luctus lobortis id vel nulla. Suspendisse lacinia dolor et m i venenatis porttitor."} 
      imageSrc={"/services/mma.jpg"} 
      length={"1hr"} 
      cost={"$90"}
      />,
      <Service
      key={4} 
      title={"1:1 Coaching"} 
      description={"Cras porta ferm entum  efficitur. Vestibulum  accum san tem por quam , a congue erat placerat at. Phasellus placerat m assa at ligula feugiat, posuere sem per leo scelerisque. Vestibulum  quis nunc at justo vehicula auctor. "} 
      imageSrc={"/services/1-1-coaching.jpg"} 
      length={"1hr"} 
      cost={"$90"} 
      />,
      <Service 
      key={5}
      title={"Running Group"} 
      description={"In id erat faucibus, pellentesque elit eu, dictum  arcu. Pellentesque tincidunt blandit pellentesque."} 
      imageSrc={"/services/running.jpg"} 
      length={"1hr"} 
      cost={"$90"} 
      />,
      <Service 
      key={6}
      title={"Kids Club Exercise"} 
      description={"Curabitur consequat sem per ex eu feugiat. Nullam  id dui tincidunt, suscipit justo nec, vehicula quam ."} 
      imageSrc={"/services/kids-club.jpg"} 
      length={"1hr"} 
      cost={"$90"} 
      />
    ]
    
    this.fetchServices().then(res => {
      this.setState({services: tempServices})  
    })
  }

  async fetchServices() {
    let result;

    const raw = await fetch("http://localhost:3000")
      .then(res => res.json())
      .catch(err => { return {error: true, message: err.message} })

    if (raw['error'] !== undefined && raw['error']) {
      result = (
        <div className="booking-error-box">
          <p className="booking-sad-face">Oh no.. :(</p>
          <p>Looks like there was an issue getting our services, please try again later.</p>
        </div>
      )
    } else {
      result = raw.map(service => {
        return (<Service 
          key={service.id}
          title={service.title} 
          description={service.description} 
          imageSrc={service.imageSrc} 
          length={service.length} 
          cost={service.cost} 
        />)
      })
    }

    return result;
  }

  currentTab(stage) {
    return "booking-transition-text " + (
      this.state.stage === stage ? 
        "booking-current" : 
        ""
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
        
          <div id="landing-service-tab" className="booking-bar-services" > {/* Services */}
            {this.state.services}
          </div>

          <div id="landing-date-tab"> {/* Dates */} </div>
          
          <div id="landing-booking-tab"> {/* Book */} 
            <div> {/* New Sign Up */} </div>
            <div> {/* Dates */} </div>
            <div> {/* Dates */} </div>
          </div>
        
        </div>
      </div>
    )
  }

}

export default BookingBar