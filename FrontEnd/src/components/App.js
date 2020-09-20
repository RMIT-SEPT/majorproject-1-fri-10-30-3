import React from 'react'
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

const App = () => (
  <Router>
    <Switch>
      
      {/* ROOT */}
      <Route exact path="/" component={Home} />

      {/* DASHBOARDS */}
      <Route path="/dashboard/customer" component={CustomerDashboard} />
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/employee" component={EmployeeDashboard} />

      {/* CRUD Operations */}
      <Route path="/create/:object" component={CreatePage} />
      <Route path="/read/:object/:id" component={ReadPage} />
      <Route path="/update/:object/:id" component={EditPage} />
      <Route path="/delete/:object/:id" component={DeletePage} />

    </Switch>
  </Router>
)

export default App
