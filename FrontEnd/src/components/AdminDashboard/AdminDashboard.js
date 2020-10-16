import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { types, structs, session } from '../../constants/types'
import './AdminDashboard.css'
import config from '../../config'

class AdminDashboard extends Component {

  constructor() {
    super()

    this.state = {
      headings: [],
      records: [],
      currentTab: types.SKILLS,
    }
  }

  componentDidMount() {
    this.updateTable(this.state.currentTab)
  }

  async updateTable(tab) {
    let raw = await fetch(`${config.base}${tab}`, {
      headers: {
        Authorization: sessionStorage.getItem(session.TOKEN)
      }
    })
    .then(res => this.validateStatus(res))
    .then(res => res.json())
    .catch(this.errorHandler.bind(this))
    
    let valid = raw !== undefined && raw !== null && raw.length > 0
    
    if (valid) {
      raw = !Array.isArray(raw) ? [raw] : raw
      const keys = Object.keys(raw[0])
      const headings = keys.map((e, i) => <td className="admin-dashboard-heading" key={i}>{e}</td>)
      const data = raw.map((e, i) => {  
        const t = tab === types.ENROLLMENT ? types.BOOKING : tab
        const path = `/read/${t}/${e[structs[t].id]}`
        const callback = () => { this.props.history.push(path) }
        return (
          <tr className="admin-dashboard-row" onClick={callback} key={i}>{
            this.parseFields(keys, e)}
          </tr>
        )
      })

      this.setState({
        currentTab: tab,
        headings: headings,
        records: data,
      })
    }
  }

  parseFields(data, raw) {
    return data.map((head, i) => { 
      return (<td key={i} >{this.sanitiseField(head, raw[head])}</td>)
    })
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

  activeBtn(type) {
    return type === this.state.currentTab ? "admin-dashboard-active" : ""
  }

  validateStatus(response) {
    if (response.status >= 400) {
      throw response.status
    }

    return response
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

  render() {
    return (
      <div>
        <Header />
        <div className="admin-dashboard-container">
          <div className="admin-dashboard-contents">
            <div className="admin-dashboard-title">
              <h1>Welcome Admin {sessionStorage.getItem(session.NAME)}</h1>
            </div>
            <div className="admin-dashboard-action-container">
              <Link to="/create/customer"><span>Create Customer</span></Link>
              <Link to="/create/employee"><span>Create Employee</span></Link>
              <Link to="/create/skills"><span>Create Skill</span></Link>
              <Link to="/create/schedule"><span>Create Schedule</span></Link>
              <Link to="/create/booking"><span>Create Booking</span></Link>
            </div>
            <div className="admin-dashboard-tables-container">
              <div className="admin-dashboard-tabs">
                <div className={this.activeBtn(types.CUSTOMER)} onClick={() => { this.updateTable(types.CUSTOMER) }}><span>Customers</span></div>
                <div className={this.activeBtn(types.EMPLOYEE)} onClick={() => { this.updateTable(types.EMPLOYEE) }}><span>Employees</span></div>
                <div className={this.activeBtn(types.SKILLS)} onClick={() => { this.updateTable(types.SKILLS) }}><span>Skills</span></div>
                <div className={this.activeBtn(types.SCHEDULE)} onClick={() => { this.updateTable(types.SCHEDULE) }}><span>Schedules</span></div>
                <div className={this.activeBtn(types.ENROLLMENT)} onClick={() => { this.updateTable(types.ENROLLMENT) }}><span>Bookings</span></div>
              </div>
              <div className="admin-dashboard-table-content">
                <table>
                  <tbody>
                    <tr>
                      {this.state.headings}
                    </tr>
                    {this.state.records}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default AdminDashboard
