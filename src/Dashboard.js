import React, { Component } from 'react';
import {
  Redirect
} from "react-router-dom";

export default class Dashboard extends Component {
  render() {
    // console.log(this.props)
    if (!this.props.token) return <Redirect to='/' />
    return (
      <div>
        This is your dashboard, welcome!!!
      </div>
    )
  }
}
