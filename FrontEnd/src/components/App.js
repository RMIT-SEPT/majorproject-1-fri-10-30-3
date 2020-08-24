import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Home/Home'
import CustomerDashboard from './CustomerDashboard/CustomerDashboard'
import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard/customer" component={CustomerDashboard} />
    </Switch>
  </Router>
)

export default App
