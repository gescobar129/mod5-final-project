import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Button } from 'reactstrap';
import './NavbarComponent.css'

export default class NavbarComponent extends Component {

  render() {
    return (

      <nav id="navbar-css" class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" class="navbar-brand" id="basecoin">basecoin</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <Link to="/prices" class="nav-link">Prices<span class="sr-only">(current)</span></Link>
              {/* <a class="nav-link" href="#">Prices <span class="sr-only">(current)</span></a> */}
            </li>
            {!!this.props.token ? <Link to="/dashboard" class="nav-link">Dashboard</Link> : ""}
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Company
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">About Us</a>
                <a class="dropdown-item" href="#">Support</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item active">
            {!!this.props.token ? <Link to="/watchlist" class="nav-link">Watchlist</Link> : ""}
            </li>
          </ul>
          {!!this.props.token ? <Button color="danger" onClick={this.props.logOutClick}>Log out</Button> : ""}
          <div style={{marginRight: 15}}>{!this.props.token ? <Link to="/login">Login</Link> : ""} </div>
          {!this.props.token ? <Link to="/signup"><Button outline color="primary">Get Started</Button>{' '}</Link> : ""}
        </div>
      </nav>
    )
  }
}
