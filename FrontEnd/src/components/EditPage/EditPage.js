import React, { Component } from 'react'
import { structs } from '../../constants/types'
import {Link, withRouter} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './EditPage.css'
import config from '../../config'

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
      fetch(structs[this.props.match.params.object].url + `/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(res => {
          if (res) {
            this.renderElements(structs[this.props.match.params.object].fields, res)
          } else {
            this.setState({
              elements: [
                (<p>Invalid ID Provided.</p>)
              ]
            })
          }
        })
    }
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.parseFields(data))
      })
      .then(res => {
        if (res.ok) {
          // TODO: Update this to actual user type currently logged in
          this.props.history.push("/dashboard/admin")
        } else {

          // TODO: Preferably create pretty modal
          window.alert("Looks like something went wrong, please try again later.")
        }
      })
    } else {

      // TODO: Preferably create pretty modal
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

  render() {
    return (
      <div>
        <Header />
        <div className="edit-page-container">
          <div className="edit-page-contents">
            <div className="edit-page-title-content">
              <h1>Edit {this.state.title}</h1>
                {/* TODO: Update link to dashboard of currently logged in user type, e.g. Admin or employee */}
                <Link to='/dashboard/admin'><i className="far fa-times-circle"></i></Link>
            </div>

            <div className="edit-page-fields">
              {this.state.elements}
            </div>

            <div className="edit-page-actions">
            {/* TODO: Update link to dashboard of currently logged in user type, e.g. Admin or employee */}
              <Link to={`/read/${this.state.object}/${this.state.id}`} className="delete-page-cancel">Cancel</Link>
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
