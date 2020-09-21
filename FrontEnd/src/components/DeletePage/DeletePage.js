import React, { Component } from 'react'
import { structs } from '../../constants/types'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './DeletePage.css'
import config from '../../config'

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

  deleteRecord() {
    fetch(`${config}${this.state.object}/delete/${this.state.id}`, {
      method: 'DELETE'
    })
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
              {/* TODO: Update link to dashboard of currently logged in user type, e.g. Admin or employee */}
              <Link to={`/read/${this.state.object}/${this.state.id}`} className="delete-page-cancel">Cancel</Link>
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
