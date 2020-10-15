import React, { Component } from 'react'
import { Link, withRouter} from 'react-router-dom'
import config from '../../config'
import { session, types } from '../../constants/types'
import './Header.css'

class Header extends Component {
  
  constructor() {
    super()
    
    this.state = {
      login: 0
    }
  }

  componentDidMount() {
    this.setState({
      login: sessionStorage.getItem("login")
    })

    if (sessionStorage.getItem("login") === "0") {
      this.props.history.push("/")
    }
  }

  logout() {
    sessionStorage.setItem(session.LOGIN, 0)
    sessionStorage.setItem(session.TYPE, types.credentials.DEFAULT)
    sessionStorage.setItem(session.NAME, types.credentials.DEFAULT)
    sessionStorage.setItem(session.TOKEN, types.credentials.DEFAULT)
    sessionStorage.setItem(session.ID, types.credentials.DEFAULT)

    if (window.location.pathname === "/") {
      window.location.reload()
    } else {
      this.props.history.push("/")
    }
  }

  home() {
    return (
      <div className="header-inner-content home-icons">
        <p className="ff-white">Welcome, {sessionStorage.getItem(session.NAME)}</p>
        <Link to={this.urlBuilder(sessionStorage.getItem(session.TYPE))}><p  ><i title="Dashboard" className="fas ff-yellow fa-home"></i></p></Link>
        <Link onClick={this.logout.bind(this)} to="/"><p><i title="Logout" className="fas ff-yellow fa-sign-out-alt"></i></p></Link>
      </div>
    )
  }

  login() {
    return (
      <div className="header-inner-content login-fields">
        <input className="header-login-input" type="text" placeholder="Username.."></input>
        <input className="header-login-input" type="password" placeholder="Password.."></input>
        <button className="header-login" onClick={this.validateLogin.bind(this)} to={`/dashboard/${sessionStorage.getItem(session.TYPE)}`}><i className="header-login-icon fas fa-sign-in-alt"></i></button>
        
      </div>
    )
  }

  validateLogin() {
    const username = document.querySelectorAll(".header-login-input")[0].value
    const password = document.querySelectorAll(".header-login-input")[1].value 

    fetch(config.base + "customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: username,
        password: password
      })
    })
    .then(this.validateStatus)
    .then(res => this.storeUpdates(res, username))
    .then(res => this.storePersonUpdates(res, username))
    .then(res => {
      this.props.history.push(this.urlBuilder(res.type))
    })
    .catch(err => {
      console.log(err)
      this.props.history.push("/")
    })
  }

  urlBuilder(type) {
    return `/dashboard/${type}/${sessionStorage.getItem(session.ID)}`
  }

  storeUpdates(response) {
    sessionStorage.setItem(session.LOGIN, 1)
    sessionStorage.setItem(session.TYPE, response.type)
    sessionStorage.setItem(session.TOKEN, response.token)

    return response
  }

  async storePersonUpdates(response, username) {
    await fetch(config.base +  `${(response.type).toLowerCase()}`, {
      headers: {
        Authorization: response.token
      }
    })
    .then(res => res.json())
    .then(res => Array.isArray(res) ? res : [res])
    .then(res => res.filter(p => p.userName === username))
    .then(async res => {
      sessionStorage.setItem(session.NAME, res[0].fname)
      sessionStorage.setItem(session.ID, res[0].id)
    })

    return response
  }
  
  validateStatus(response) {
    if (response.status >= 400) {
      throw response.status
    }

    return response.json()
  }
    
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
          <p><a href="/#contact" className="links"> Contact</ a></p>
        </div>
        
        { this.state.login === "1" ? this.home() : this.login() }
        
      </div>

    </div>
    )
  }
}

export default withRouter(Header)
