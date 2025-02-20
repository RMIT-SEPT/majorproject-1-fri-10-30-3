import React, { Component } from 'react'
import './Service.css'

class Service extends Component {

  onClick() {
    this.props.onClick({
      id: this.props.id,
      title: this.props.title,
      imageSrc: this.props.imageSrc,
      description: this.props.description,
      length: this.props.length,
      cost: this.props.cost,
    })
  }

  render() {
    return (
      <div className="service-container">
        <div className="service-content">
          
          <div className="service-top-content">
            <img className="service-image" src={this.props.imageSrc} alt={this.props.title}></img>
            
            <p className="ff-off-black service-title">{this.props.title}</p>
            <p className="ff-off-black service-description">{this.props.description}</p>
          </div>

          <div className="service-bottom-content">
            <div className="service-bottom-price-length">
              <p>{this.props.length} hr</p>
              <p>${this.props.cost}</p>
            </div>
            <button onClick={this.onClick.bind(this)} className="ff-bg-yellow service-action">Select</button>
          </div>
          
        </div>
      </div>
    )
  }

}

export default Service
