import React, { Component } from 'react'
import { structs } from '../../constants/types'
import {Link, withRouter} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './EditPage.css'
import config from '../../config'
import { session, types } from "../../constants/types";

class EditPage extends Component {

  constructor() {
    super()

    this.state = {
      title: '',
      key: '',
      id: '',
      object: '',
      elements: []
    }
  }

  componentDidMount() {
    
    this.setState({
      id: this.props.match.params.id,
      key: this.props.match.params.object,
      object: this.props.match.params.object,
      title: structs[this.props.match.params.object] ? 
        structs[this.props.match.params.object].title : "Default"
    })

    if (structs[this.props.match.params.object] !== undefined) {
      this.buildElement()
    }
  }

  buildElement() {
    fetch(structs[this.props.match.params.object].url + "/" + this.props.match.params.id, {
      headers: {
        Authorization: sessionStorage.getItem(session.TOKEN),
      }
    })
    .then(this.validateStatus.bind(this))
    .then(res => res.json())
    .then(res => {
      if (res) {
        this.renderElements(structs[this.props.match.params.object].fields, res)
      } else {
        this.setState({
          elements: [
            (<p key="1">Invalid ID Provided.</p>)
          ]
        })
      }
    })
    .catch(this.errorHandler.bind(this))
  }

  validateStatus(response) {
    if (response.status >= 400) {
      throw response.status
    } else return response
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

  renderElements(fields, res) {
    this.setState({
      elements: fields
        .filter(field => field.editable)
        .map((field, i) => {
          return (
            <input 
              id={field.name}
              required
              className="edit-page-input" 
              key={i} 
              placeholder={field.placeholder} 
              type={field.type}
              defaultValue={ field.name === "password" ? "" : res[field.name] }
            />)
        })
    })
  }

  submit() {
    const data = Array.from(document.getElementsByClassName("edit-page-input"))
    let valid = data.reduce((prev, curr) => prev && curr.validity.valid, true)
    
    if (valid) {    
      fetch(`${config.base}${this.props.match.params.object}/put/${this.props.match.params.id}`, {
        method: "PUT",
        headers: {
          Authorization: sessionStorage.getItem(session.TOKEN),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.parseFields(data))
      })
      .then(res => {
        if (res.ok) {
          this.props.history.push(this.printHomePath())
        } else {
          window.alert("Looks like something went wrong, please try again later.")
        }
      })
    } else {
      window.alert("Please fill in all reamining fields.")
    }
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

  printHomePath() {
    return `/dashboard/${sessionStorage.getItem(session.TYPE)}/${sessionStorage.getItem(session.ID)}`
  }

  render() {
    return (
      <div>
        <Header />
        <div className="edit-page-container">
          <div className="edit-page-contents">
            <div className="edit-page-title-content">
              <h1>Edit {this.state.title}</h1>
                <Link to={this.printHomePath()}><i className="far fa-times-circle"></i></Link>
            </div>

            <div className="edit-page-fields">
              {this.state.elements}
            </div>

            <div className="edit-page-actions">
              <Link to={this.printHomePath()} className="delete-page-cancel">Cancel</Link>
              <button onClick={this.submit.bind(this)} className="edit-page-edit">Confirm</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

}

export default withRouter(EditPage)
