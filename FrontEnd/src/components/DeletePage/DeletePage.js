import React, { Component } from 'react'
import { structs } from '../../constants/types'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './DeletePage.css'
import config from '../../config'
import { session, types } from "../../constants/types";

class DeletePage extends Component {

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

  deleteRecord() {
    fetch(`${config.base}${this.state.object}/delete/${this.state.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem(session.TOKEN),
      }
    })
    .then(res => this.validateStatus(res))
    .catch(this.errorHandler.bind(this))
  }

  render() {
    return (
      <div>
        <Header />
        <div className="delete-page-container">
          <div className="delete-page-contents">
            <h1>{this.state.title} - ID: {this.state.id}</h1>
            <p>Are you sure you want to delete this {this.state.object} record?</p>
            <div className="delete-page-actions">
              <Link to={`/dashboard/${sessionStorage.getItem(session.TYPE)}/${sessionStorage.getItem(session.ID)}`} className="delete-page-cancel">Cancel</Link>
              <Link onClick={this.deleteRecord.bind(this)} to={`/dashboard/admin`} className="delete-page-confirm">Confirm</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

}

export default DeletePage
