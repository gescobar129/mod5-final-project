import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './CoinDetail.css'


export default class CoinDetail extends Component {
  render() {
    console.log(this.props.history.location.state.name)
    return (

      <Container id="coin-detail-container" className="themed-container" fluid={true}>
        <Row>
          <Col>
            <div className="header-div">
              <img alt="not found" src={this.props.history.location.state.img_url}></img>
              <span style={{ marginLeft: 15}}>{this.props.history.location.state.name}</span>
              <span style={{ marginLeft: 15}}>{this.props.history.location.state.symbol}</span>
              <button id="follow-button">Follow</button>
            </div>
          </Col>
        </Row>
        <Row id="row-edits" xs="2">
          <Col>chart goes here</Col>
          <Col>buy section here</Col>
          <Col>
            <div>
              <h2>About {this.props.history.location.state.name}</h2><br></br>
              <p>{this.props.history.location.state.description}</p>
            </div>
          </Col>
          <Col>
            <div>
              <h3>Discover More Assets</h3>
              <img alt="" src={this.props.history.location.state.img_url}></img><h5>{this.props.history.location.state.name}</h5><h5>{this.props.history.location.state.price}</h5>
              
              
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
