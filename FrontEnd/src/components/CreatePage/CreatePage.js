import React, { Component } from 'react'
import { types, session, structs } from '../../constants/types'
import {Link, withRouter} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './CreatePage.css'

class CreatePage extends Component {

  constructor() {
    super()

    this.state = {
      title: '',
      key: '',
      object: '',
      elements: []
    }
  }

  componentDidMount() {
    
    this.setState({
      key: this.props.match.params.object,
      object: this.props.match.params.object,
      title: structs[this.props.match.params.object] ? 
        structs[this.props.match.params.object].title : "Default"
    })

    if (structs[this.props.match.params.object] !== undefined) {
      this.renderElements(structs[this.props.match.params.object].fields)
    }
  }

  renderElements(fields) {
    this.setState({
      elements: fields
        .map((field, i) => {
          return (
            <input 
              id={field.name}
              required
              className="create-page-input" 
              key={i} 
              placeholder={field.placeholder} 
              type={field.type}
            />)
        })
    })
  }

  submit() {
    const data = Array.from(document.getElementsByClassName("create-page-input"))
    let valid = data.reduce((prev, curr) => prev && curr.validity.valid, true)
    
    if (valid) {    
      fetch(this.generateURL(), {
        method: "POST",
        headers: {
          Authorization: sessionStorage.getItem(session.TOKEN),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.parseFields(data))
      })
      .then(res => this.validateStatus(res))
      .then(res => {
        if (res.ok) {
          this.props.history.push(this.printHomePath())
        } else {
          window.alert("Looks like something went wrong, please try again later.")
        }
      })
      .catch(this.errorHandler.bind(this))
    } else {
      window.alert("Please fill in all reamining fields.")
    }
  }

  generateURL() {
    switch (this.state.object) {
      case structs.admin.key: 
      case structs.employee.key:
      case structs.customer.key:
        return structs[this.state.object].url + "/register"
      default: return structs[this.state.object].url
    }
  }

  printHomePath() {
    return `/dashboard/${sessionStorage.getItem(session.TYPE)}/${sessionStorage.getItem(session.ID)}`
  }

  parseFields(data) {
    const result = {}

    data.forEach(e => {
      switch (e.id) {
        case 'customer': 
        case 'employee': 
          result[e.id] = { id: e.value }
          break
        case 'skills':
          result[e.id] = { skillId: e.value }
          break
        case 'employeeSchedule':
          result[e.id] = { scheduleId: e.value }
          break
        default: result[e.id] = e.value
      }
    })

    return result
  }

  errorHandler(error) {
    if (error === 401) {
      this.props.history.push("/")
      sessionStorage.setItem(session.LOGIN, 0)
      sessionStorage.setItem(session.TYPE, types.credentials.DEFAULT)
      sessionStorage.setItem(session.NAME, types.credentials.DEFAULT)
      sessionStorage.setItem(session.TOKEN, types.credentials.DEFAULT)
      sessionStorage.setItem(session.ID, types.credentials.DEFAULT)
    } else console.dir(error)
  }

  validateStatus(response) {
    if (response.status >= 400) {
      throw response.status
    }

    return response
  }

  render() {
    return (
      <div>
        <Header />
        <div className="create-page-container">
          <div className="create-page-contents">
            <div className="create-page-title-content">
              <h1>Create {this.state.title}</h1>
                <Link to={this.printHomePath()}><i className="far fa-times-circle"></i></Link>
            </div>

            <div className="create-page-fields">
              {this.state.elements}
            </div>

            <div className="create-page-actions">
              <Link to={this.printHomePath()} className="create-page-delete">Cancel</Link>
              <button onClick={this.submit.bind(this)} className="create-page-edit">Create</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

}

export default withRouter(CreatePage)
