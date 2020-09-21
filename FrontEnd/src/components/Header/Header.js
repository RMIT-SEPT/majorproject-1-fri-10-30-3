import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="header-container">

      {/* Logo / Title */}
      <div className="header-content logo-title">
        <div><img className="logo ff-bg-yellow" src="/logo.png" alt="logo"></img></div>
        <p className="title ff-yellow">Fitness <span>Factory</span></p>
      </div>

      <div className="header-content links-login">
        {/* Links */}
        <div className="header-inner-content links-container">
          <p><a href="/#home" className="links"> Home </a></p><span className="seperator"> | </span>
          <p><a href="/#services" className="links"> Services </a></p><span className="seperator"> | </span>
          <p><a href="/#aboutus" className="links"> About Us </a></p><span className="seperator"> | </span>
          <p><a href="/#contact" className="links"> Contact</ a></p><span className="seperator"> | </span>
          <p><Link to="/dashboard/customer/2" className="links"> Customer</ Link></p><span className="seperator"> | </span>
          <p><Link to="/dashboard/admin" className="links"> Admin</ Link></p><span className="seperator"> | </span>
        </div>
        
        {/* Login Component */}
        <div className="header-inner-content login-fields">
          <input type="text" placeholder="Username.."></input>
          <input type="text" placeholder="Password.."></input>
          <button className="header-login"><i className="header-login-icon fas fa-sign-in-alt"></i></button>
        </div>
      </div>

    </div>
    )
  }
}

export default Header
