import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import NavbarComponent from './NavbarComponent';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard'
import Prices from './Prices'
import CoinDetail from './CoinDetail';

export default class App extends Component {

  state = {
    token: null,
    loggedInUserId: null
  }

  componentDidMount(){
    // this.setToken({
    //   token: localStorage.token,
    //   user_id: localStorage.userId
    // })
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.userId
      })
    }

  setToken = ({ token, user_id })  =>{

    localStorage.token = token
    localStorage.userId = user_id

    this.setState({
      token: token,
      loggedInUserId: user_id
    })
  }

  logOutClick = () => {
    localStorage.clear()
    // localStorage.userId = undefined
    // localStorage.token = undefined
    this.setState({
      loggedInUserId: null,
      token: null
    })
  }

  render() {
    return (
      <div>
        <Router>
      <div>
        <NavbarComponent logOutClick={this.logOutClick} token={this.state.token}/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
            <Signup setToken={this.setToken} token={this.state.token}/>
          </Route>
          <Route path="/login">
            <Login setToken={this.setToken} token={this.state.token}/>
          </Route>
          <Route path="/dashboard">
            <Dashboard token={this.state.token}/>
          </Route>
          <Route path="/prices" component={Prices}>
            {/* <Prices token={this.state.token}/> */}
          </Route>
          <Route path="/coin-detail" component={CoinDetail}>
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>   
  </div>
    )
  }
}


