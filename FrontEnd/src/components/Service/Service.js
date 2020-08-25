import React, { Component } from 'react'
import './Service.css'

class Service extends Component {

  render() {
    return (
      <div className="service-container">
        <div className="service-content">
          
          <div className="service-top-content">
            <img className="service-image" src={this.props.imageSrc}></img>
            
            <p>{this.props.title}</p>
            <p>{this.props.description}</p>
          </div>

          <div className="service-bottom-content">
            <div className="service-bottom-price-length">
              <p>{this.props.length}</p>
              <p>{this.props.cost}</p>
            </div>
            <button className="ff-bg-yellow service-action">Select</button>
          </div>
          
        </div>
      </div>
    )
  }

}

export default Service
