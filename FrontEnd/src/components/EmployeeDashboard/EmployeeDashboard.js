import React, { Component } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./EmployeeDashboard.css"
import { Link } from "react-router-dom";


class EmployeeDashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fname: '',
      lname: '',
      userName: '',
      password: '',
      id: props.match.params.id,
      schedule: [],
      skills: []
    }
  }

  componentDidMount() {
    this.updateEmployeeDetails()
    this.updateScheduleRecords()
    this.updateSkills()
  }

  updateEmployeeDetails() {
    fetch(`http://localhost:8080/api/employee/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState(res)
      })
  }

  updateScheduleRecords() {
    fetch(`http://localhost:8080/api/schedule`)
      .then(res => res.json())
      .then(res => {
        const filtered = res.filter(b => b.employee.id === this.state.id)
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
          .then(res => res.json())
          .then(res => Array.isArray(res) ? res : [res])
          .then(res => res.map(s => s.skills.skillId))
          .then(res =>  res.filter((value, index, self) => {
            return self.indexOf(value) === index;
          }))
          console.log(skillId)
        const filtered = res.filter(b => skillId.find(s => s === b.skillId))
        const parsed = this.parseSkill(filtered)
        
        this.setState({
          skills: parsed
        })
      })
  }

  parseSchedule(data) {
    return data.map((b, i) => {
      return (
        <tr 
          className="customer-dashboard-record" 
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
          className="customer-dashboard-record" 
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

  render() {
    return (
      <div className="customer-dashboard-box">
      {/* HEADER */}
      <Header></Header>

      <body>

        <div className="customer-dashboard-inner">
          <div className="customer-dashboard-container">
            
            {/* USER INFO */}
            <div className="customer-dashboard-personal-info">
              <h1>Hello, {this.state.fname}</h1>
              <div>
                <div className="customer-dashboard-data">
                  <p className="customer-dashboard-title">First Name</p>
                  <p className="customer-dashboard-title">Last Name</p>
                  <p className="customer-dashboard-title">UserName</p>
                </div>
                <div className="customer-dashboard-data customer-dashboard-spacer">
                  <p>{this.state.fname}</p>
                  <p>{this.state.lname}</p>
                <p>{this.state.userName}</p>
                </div>
              </div>
              <div>
                <div className="customer-dashboard-data">
                    <p className="customer-dashboard-title">Password</p>
                    <p className="customer-dashboard-title">Address</p>
                    <p className="customer-dashboard-title">Phone Number</p>
                  </div>
                  <div className="customer-dashboard-data">
                    <p>{this.state.password}</p>
                    <p>123 Street, Melb, Victoria</p>
                    <p>+61 123 123 123</p>
                  </div>
              </div>
              <Link className="customer-dashboard-edit-btn" to={`/update/employee/${this.state.id}`}><span>Edit</span></Link>
            </div>

            {/* TABLE */}
            <div className="customer-dashboard-table-container">
              <h3>{this.state.fname}'s Schedule</h3>
              <table className="customer-dashboard-table">
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
            <div className="customer-dashboard-table-container">
            <h3>{this.state.fname}'s Skills</h3>
              <table className="customer-dashboard-table">
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
      </body>


      {/* FOOTER */}
      <Footer></Footer>
      </div>
    )
  }

}

export default EmployeeDashboard
