import React, { Component } from 'react'
import { types, structs } from '../../constants/types'
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
    fetch(obj.url + `/${id}`)
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
                <td>{field}</td>
                <td>{this.sanitiseField(field, res[field])}</td>
              </tr>)
          }) 

          this.setState({
            elements: data
          })
        }
      })
      .catch(this.error.bind(this))
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
          <td>Error</td>
          <td>Object Type '{this.props.match.params.object}' Does Not Exist</td>
        </tr>
      )]
    })
  }

  error(log) {
    this.setState({
      elements: [(
        <tr key="0">
          <td>Error</td>
          <td>Hmm.. Looks like something went wrong there, please try again later</td>
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
                {/* TODO: Update link to dashboard of currently logged in user type, e.g. Admin or employee */}
                <Link to='/dashboard/admin'><i className="far fa-times-circle"></i></Link>
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
