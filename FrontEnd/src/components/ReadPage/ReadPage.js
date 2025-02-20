import React, { Component } from 'react'
import { types, structs, session } from '../../constants/types'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './ReadPage.css'

class ReadPage extends Component {

  constructor() {
    super()

    this.state = {
      title: '',
      key: '',
      object: '',
      id: '',
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
    
    this.renderElements(
      this.props.match.params.object,
      this.props.match.params.id)
  }

  renderElements(key, id) {
    switch (key) {
      case types.CUSTOMER: 
        this.parseFields(structs.customer, id)
        break
      case types.EMPLOYEE:
        this.parseFields(structs.employee, id)
        break
      case types.SKILLS:
        this.parseFields(structs.skills, id)  
        break
      case types.BOOKING: 
        this.parseFields(structs.booking, id)
        break
      case types.SCHEDULE: 
        this.parseFields(structs.schedule, id)
        break
      default: this.default()
    }
  }

  parseFields(obj, id) {
    fetch(obj.url + `/${id}`, {
      headers: {
        Authorization: sessionStorage.getItem(session.TOKEN),
      }
    })
      .then(res => this.validateStatus(res))
      .then(res => res.json())
      .then(res => {
        if (res == null) {
          this.empty()
        } else {
          let data = Object
          .keys(res)
          .map((field, i) => {
            return (
              <tr key={i}>
                <td className="read-page-field">{field}</td>
                <td className="read-page-data">{this.sanitiseField(field, res[field])}</td>
              </tr>)
          }) 

          this.setState({
            elements: data
          })
        }
      })
      .catch(this.errorHandler.bind(this))
  }

  errorHandler(error) {
    if (error === 401) {
      this.props.history.push("/")
      sessionStorage.setItem(session.LOGIN, 0)
      sessionStorage.setItem(session.TYPE, types.credentials.DEFAULT)
      sessionStorage.setItem(session.NAME, types.credentials.DEFAULT)
      sessionStorage.setItem(session.TOKEN, types.credentials.DEFAULT)
      sessionStorage.setItem(session.ID, types.credentials.DEFAULT)
    } else return this.error()
  }

  validateStatus(response) {
    if (response.status >= 400) {
      throw response.status
    }

    return response
  }

  sanitiseField(field, data) {
    if (typeof data == "object") {
      switch (field) {
        case 'employee': data = data.id
          break
        case 'customer': data = data.id
          break
        case 'skills': data = data.skillId
          break
        case 'employeeSchedule': data = data.scheduleId
          break
        default: data = null
      }
    }

    return data
  }

  empty() {
    this.setState({
      elements: [(
        <tr key="0">
          <td>Empty</td>
          <td>Object ID Does Not Exist</td>
        </tr>
      )]
    })
  }

  default() {
    this.setState({
      elements: [(
        <tr key="0">
          <td className="read-page-field">Error</td>
          <td className="read-page-data">Object Type '{this.props.match.params.object}' Does Not Exist</td>
        </tr>
      )]
    })
  }

  error(log) {
    this.setState({
      elements: [(
        <tr key="0">
          <td className="read-page-field">Error</td>
          <td className="read-page-data">Hmm.. Looks like something went wrong there, please try again later</td>
        </tr>
      )]
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="read-page-container">
          <div className="read-page-contents">
            <div className="read-page-title-content">
              <h1>{this.state.title} - ID: {this.state.id}</h1>
                <Link to={`/dashboard/${sessionStorage.getItem(session.TYPE)}/${sessionStorage.getItem(session.ID)}`}><i className="far fa-times-circle"></i></Link>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Attribute</th>
                  <th>Data</th>
                </tr>
                {this.state.elements}
              </tbody>
            </table>
            <div className="read-page-actions">
              <Link to={`/update/${this.state.object}/${this.state.id}`} className="read-page-edit">Edit</Link>
              <Link to={`/delete/${this.state.object}/${this.state.id}`} className="read-page-delete">Delete</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

}

export default ReadPage
