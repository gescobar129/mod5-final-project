import React, { Component } from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";
import './Signup.css'

export default class Signup extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    state: "",
    errors: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignupSubmit = (event) => {
    event.preventDefault() 
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        state: this.state.state
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        this.props.setToken(data)
      }
    })
  }

  render() {
    if (this.props.token) return <Redirect to='/dashboard' />
    return (
      <div className="body-color"> 
        <div class="login-page">
          <div class="form">
            <form class="login-form" onSubmit={this.handleSignupSubmit}>
              <input onChange={this.handleChange} type="text" name="name" placeholder="name"/>
              <input onChange={this.handleChange} type="text" name="email" placeholder="email address"/>
              <input onChange={this.handleChange} type="password" name="password" placeholder="password"/>
              <select onChange={this.handleChange} name="state">
                <option value="">State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            <button>create account</button>
            <p class="message">Already registered? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
    )
  }
}
