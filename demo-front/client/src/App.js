import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Products from './components/Admin/Products/Products';
import Users from './components/Admin/Users/Users';
import Login from './components/Login/Login';
import FormUser from './components/Admin/Users/form';
import EditUser from './components/Admin/Users/edit';
import FormProd from './components/Admin/Products/FormProd';
import EditProd from './components/Admin/Products/EditProd';
//import { saveProduct} from './components/Admin/Products/serverces'


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
          <Route exact path="/products" component={Products} />
          <Route path="/products/form" component={FormProd} />
          <Route path="/products/edit/:id" component={EditProd}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/users" component={Users}/>
          <Route path="/users/form" component={FormUser}/>
          <Route path="/users/edit/:id" component={EditUser}/>
          <Route exact path="/" component={Home} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
