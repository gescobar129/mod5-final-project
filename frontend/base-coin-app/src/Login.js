import React, { Component } from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";
import './Login.css'

export default class Login extends Component {

  state = {
    logIn: true,
    email: '',
    password: '',
    errors: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(async data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        this.props.setToken(data);
        console.log(data)
        // const response = await fetch(`http://localhost:3000/favorites`);
        // const favoritesData = await response.json()
        // const arr = favoritesData.filter(coin => {
        //   return coin.user.id === parseInt(this.props.loggedInUserId)
        // })

        const response = await fetch(`http://localhost:3000/users/${this.props.loggedInUserId}`);
        const userData = await response.json()
        console.log("user-data", userData.favorites)
        this.props.setWatchlistCoins(userData.favorites)
      }
    })
  }

  render() {
    if (this.props.token) return <Redirect to='/dashboard' />
    return (
      <div className='body-color'>
        <div class="login-page">
          <div class="form">
            <form onSubmit={this.handleLoginSubmit} class="login-form">
              <input onChange={this.handleChange} name="email" type="text" placeholder="email"/>
              <input onChange={this.handleChange} name="password" type="password" placeholder="password"/>
              <button>login</button>
              <p class="message">Not registered? <Link to="/signup">Create an account</Link></p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
