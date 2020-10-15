import React, { Component } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./EmployeeDashboard.css"
import { Link } from "react-router-dom";
import { types, session } from '../../constants/types'


class EmployeeDashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fname: '',
      lname: '',
      userName: '',
      password: '',
      phone: '',
      address: '',
      id: props.match.params.id,
      schedule: [],
      skills: []
    }
  }

  componentDidMount() {
    this.updateEmployeeDetails()
    this.updateSkills()
    this.updateScheduleRecords()
  }

  updateEmployeeDetails() {
    fetch(`http://localhost:8080/api/employee/${this.state.id}`, {
      headers: {
        Authorization: sessionStorage.getItem(session.TOKEN)
      }
    })
      .then(res => this.validateStatus(res))
      .then(res => res.json())
      .then(res => {
        this.setState(res)
      })
      .catch(this.errorHandler.bind(this))
  }

  updateScheduleRecords() {
    fetch(`http://localhost:8080/api/schedule`)
      .then(res => res.json())
      .then(res => {
        const filtered = res.filter(b => b.employee.id === Number.parseInt(this.state.id))
        const parsed = this.parseSchedule(filtered)
      
        this.setState({
          schedule: parsed
        })
      })
  }

  updateSkills(){
    fetch(`http://localhost:8080/api/skills`)
      .then(res => res.json())
      .then(async res => {
        const skillId = await fetch(`http://localhost:8080/api/schedule`)
          .then(res1 => res1.json())
          .then(res1 => Array.isArray(res1) ? res1 : [res1])
          .then(res1 => res1.map(s => s.skills.skillId))
          .then(res1 =>  res1.filter((value, index, self) => self.indexOf(value) === index))
        const filtered = res.filter(b => skillId.find(s => s === b.skillId))
        const parsed = this.parseSkill(filtered)
        
        this.setState({
          skills: parsed
        })
      })
      .catch(this.errorHandler.bind(this))
  }

  parseSchedule(data) {
    return data.map((b, i) => {
      return (
        <tr 
          className="employee-dashboard-record" 
          onClick={() => { this.props.history.push(`/read/schedule/${b.scheduleId}`) }} 
          key={i}
        >
          <td>{b.scheduleId}</td>
          <td>{b.employee.id}</td>
          <td>{b.skills.skillid}</td>
          <td>{b.capacity}</td>
          <td>{b.price}</td>
          <td>{b.availability}</td>
          <td>{b.startingHour}</td>
          <td>{b.length}</td>
          <td>{b.createdAt}</td>
          <td>{b.updatedAt}</td>
        </tr>
      )
    })
  }

  parseSkill(data){
    return data.map((b, i) => {
      return (
        <tr 
          className="employee-dashboard-record" 
          onClick={() => { this.props.history.push(`/read/skills/${b.skillId}`) }} 
          key={i}
        >
          <td>{b.skillId}</td>
          <td>{b.skillsName}</td>
          <td>{b.title}</td>
          <td>{b.imageSrc}</td>
          <td>{b.description}</td>
          <td>{b.length}</td>
          <td>{b.cost}</td>
          <td>{b.createdAt}</td>
          <td>{b.updatedAt}</td>
        </tr>
      )
    })
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
      <div className="employee-dashboard-box">
      {/* HEADER */}
      <Header></Header>
      <div className="employee-dashboard-inner">
          <div className="employee-dashboard-container">
            
            {/* USER INFO */}
            <div className="employee-dashboard-personal-info">
              <h1>Hello, {this.state.fname}</h1>
              <div>
                <div className="employee-dashboard-data">
                  <p className="employee-dashboard-title">First Name</p>
                  <p className="employee-dashboard-title">Last Name</p>
                  <p className="employee-dashboard-title">UserName</p>
                </div>
                <div className="employee-dashboard-data employee-dashboard-spacer">
                  <p>{this.state.fname}</p>
                  <p>{this.state.lname}</p>
                <p>{this.state.userName}</p>
                </div>
              </div>
              <div>
                <div className="employee-dashboard-data">
                    <p className="employee-dashboard-title">ID</p>
                    <p className="employee-dashboard-title">Address</p>
                    <p className="employee-dashboard-title">Phone Number</p>
                  </div>
                  <div className="employee-dashboard-data">
                    <p>{this.state.id}</p>
                    <p>{this.state.address}</p>
                    <p>{this.state.phone}</p>
                  </div>
              </div>
              <Link className="employee-dashboard-edit-btn" to={`/update/employee/${this.state.id}`}><span>Edit</span></Link>
            </div>

            {/* TABLE */}
            <div className="employee-dashboard-table-container">
              <h3 className="ff-white">Schedule</h3>
              <table className="employee-dashboard-table">
                <tbody>
                  <tr>
                    <th>Schedule ID</th>
                    <th>Empoyee ID</th>
                    <th>Skill ID</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th>Starting Hour</th>
                    <th>Length</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                  {this.state.schedule}
                </tbody>
              </table>
            </div>

            
          {/* TABLE - skills */}
          <div className="employee-dashboard-table-container">
          <h3 className="ff-white">Skills</h3>
            <table className="employee-dashboard-table">
              <tbody>
                <tr>
                  <th>Skill ID</th>
                  <th>Skill Name</th>
                  <th>Title</th>
                  <th>Image Src</th>
                  <th>Description</th>
                  <th>Length</th>
                  <th>Cost</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
                {this.state.skills}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <Footer></Footer>
      </div>
    )
  }

}

export default EmployeeDashboard
