import React from 'react'
import './Header.css'

const Header = () => (
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
      </div>
      
      {/* Login Component */}
      <div className="header-inner-content login-fields">
        <input type="text" placeholder="Username.."></input>
        <input type="text" placeholder="Password.."></input>
        <button>Log In</button>
      </div>
    </div>

  </div>
)

export default Header
