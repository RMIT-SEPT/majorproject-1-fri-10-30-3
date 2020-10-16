import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Home/Home'

// Dashboards
import CustomerDashboard from './CustomerDashboard/CustomerDashboard'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard'

// Crud Operations
import CreatePage from './CreatePage/CreatePage'
import ReadPage from './ReadPage/ReadPage'
import EditPage from './EditPage/EditPage'
import DeletePage from './DeletePage/DeletePage'

import './App.css'

export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          
          {/* ROOT */}
          <Route exact path="/" component={Home} />

          {/* DASHBOARDS */}
          <Route path="/dashboard/customer" component={CustomerDashboard} />
          <Route path="/dashboard/admin" component={AdminDashboard} />
          <Route path="/dashboard/employee/:id" component={EmployeeDashboard} />

          {/* CRUD Operations */}
          <Route path="/create/:object" component={CreatePage} />
          <Route path="/read/:object/:id" component={ReadPage} />
          <Route path="/update/:object/:id" component={EditPage} />
          <Route path="/delete/:object/:id" component={DeletePage} />

        </Switch>
      </Router>
    )
  }

}
