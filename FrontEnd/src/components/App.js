import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home/Home'
import CustomerDashboard from './CustomerDashboard/CustomerDashboard'
import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard/customer">
        <CustomerDashboard />
      </Route>
    </Switch>
  </Router>
)

export default App
