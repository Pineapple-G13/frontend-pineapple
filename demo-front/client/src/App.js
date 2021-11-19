import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import Products from './components/Admin/Products/Products'
import Users from './components/Admin/Users/Users'
import Login from './components/Login/SignIn'

function App() {
  //Routes if not logged in
  //codigo

  //Routes if authenticated
  //codigo

  
  return (
    <div className="App">
    <Router>
      <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home} ></Route>
          <Route exact path="/products"component={Products} ></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/users" component={Users}></Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
