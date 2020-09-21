import React, { Component } from 'react'
import { structs } from '../../constants/types'
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
      fetch(structs[this.state.object].url, {
        method: "POST",
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
        case 'employee_schedule':
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
        <div className="create-page-container">
          <div className="create-page-contents">
            <div className="create-page-title-content">
              <h1>Create {this.state.title}</h1>
                {/* TODO: Update link to dashboard of currently logged in user type, e.g. Admin or employee */}
                <Link to='/dashboard/admin'><i className="far fa-times-circle"></i></Link>
            </div>

            <div className="create-page-fields">
              {this.state.elements}
            </div>

            <div className="create-page-actions">
            {/* TODO: Update link to dashboard of currently logged in user type, e.g. Admin or employee */}
              <Link to='/dashboard/admin' className="create-page-delete">Cancel</Link>
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
