import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Chart from './Chart'
import './CoinDetail.css'


export default class CoinDetail extends Component {

  handleClick = () => {
    console.log('selectedcoin', this.props.history.location.state.selectedCoin);
    if (!this.props.watchlistCoins.includes(this.props.history.location.state.selectedCoin)) {
      this.props.addToWatchlist(this.props.history.location.state.selectedCoin)
    }
  }

  goToCoinDetail = (coin) => {
    this.props.history.push('/coin-detail', {selectedCoin: coin, coinList: this.props.location.state.coinList})
  }
  
  render() {
    console.log(this.props)
    return (

      <Container id="coin-detail-container" className="themed-container" fluid={true}>
        <Row>
          <Col>
            <div className="header-div">
              <img alt="not found" src={this.props.history.location.state.selectedCoin.img_url}></img>
              <span style={{ marginLeft: 15}}>{this.props.history.location.state.selectedCoin.name}</span>
              <span style={{ marginLeft: 15}}>{this.props.history.location.state.selectedCoin.symbol}</span>
             <button id="follow-button" onClick={this.handleClick}>Add To Watchlist</button> 
            </div>
          </Col>
        </Row>

        <Row id="row-edits">
          <Col xs="5">
            <div id="chart-column">
              <Chart coin={this.props.history.location.state.selectedCoin}/>
            </div>
          </Col>

          <Col xs="4">
            <div id="buy-coin-column">
              buy section here
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs="5" id="about-column">
            <div id="about-div">
              <h2>About {this.props.history.location.state.selectedCoin.name}</h2><br></br>
              <p>{this.props.history.location.state.selectedCoin.description}</p><br></br>
              <h4>Resources</h4>
              <a href={this.props.history.location.state.selectedCoin.website.replace('[\"', "").replace('\"]', "")}>Website</a><br></br>
              <a href={this.props.history.location.state.selectedCoin.tech_doc.replace('[\"', "").replace('\"]', "")}>Technical Document</a>
            </div>
            <div id="news-div">
              News Articles Here
            </div>
          </Col>

          <Col xs="4" id="assets-column">
            <div>
              <h3>Discover More Assets</h3>
              {this.props.history.location.state.coinList.slice(0, 9).map(coin => {
                return <div onClick= {() => this.goToCoinDetail(coin)}>
                  <img alt="not found"style={{marginTop: 30}}src={coin.img_url}></img><span style={{marginLeft: 15, marginTop: 30}}>{coin.name}</span><span style={{marginLeft: 15, float: 'right', marginTop: 30}}>${coin.price.toFixed(2)}</span>
                  </div>
              })}  
            </div>
          </Col>

        </Row>
          
        
      </Container>
    )
  }
}
