import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Chart from './Chart';
import CheckoutForm from './CheckoutForm';
import './CoinDetail.css';
import moment from 'moment'


export default class CoinDetail extends Component {

  state = {
    isModalOpen: false,
    purchaseAmount: 0,
    historicalData: []
  }

  handleClick = () => {
    if (!this.props.watchlistCoins.includes(this.props.history.location.state.selectedCoin)) {
      this.props.addToWatchlist(this.props.history.location.state.selectedCoin)
    }
  }

  handleBuyClick = () => {
    if(!!this.props.token) {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      })
    } else {
      alert('you must login')
    }
  }

  goToCoinDetail = (coin) => {
    this.props.history.push('/coin-detail', {selectedCoin: coin, coinList: this.props.location.state.coinList})
    this.getHistoricalData();
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getHistoricalData = async () => {
    try {
      const response = await fetch(`https://api-public.sandbox.pro.coinbase.com/products/${this.props.history.location.state.selectedCoin.symbol}-USD/candles?start=${moment().subtract(1, 'day').format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}&granularity=3600`)

      if (response.ok) {
        const data = await response.json()
        this.setState({
          historicalData: data.reverse()
        })
      }
      else {
        this.setState({
          historicalData: null
        })
      }

    } catch (error) {
      console.log('WOOOOWOOWOWOW', error);
    }
  }

  componentDidMount() {
    this.getHistoricalData();
  
  }

  render() {
    return (

      <Container id="coin-detail-container" className="themed-container" fluid={true}>
        <Row>
          <Col>
            <div className="header-div">
              <img alt="not found" src={this.props.history.location.state.selectedCoin.img_url}></img>
              <span style={{ marginLeft: 15}}>{this.props.history.location.state.selectedCoin.name}</span>
              <span style={{ marginLeft: 15}}>{this.props.history.location.state.selectedCoin.symbol}</span>
              <button id="buy-button" onClick={this.handleBuyClick}>Buy Now</button>
              <button id="follow-button" onClick={this.handleClick}>Add To Watchlist</button> 
            </div>
          </Col>
        </Row>

        <Row id="row-edits">
          <Col xs="5" id="about-column">
            <div id="chart-column">
             {this.state.historicalData === null  ? "No historical data available" : <Chart coin={this.props.history.location.state.selectedCoin} historicalData={this.state.historicalData}/>}
             
            
            </div>
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
              {this.props.history.location.state.coinList.slice(0, 14).map(coin => {
                return <div onClick= {() => this.goToCoinDetail(coin)}>
                  <img alt="not found"style={{marginTop: 30}}src={coin.img_url}></img><span style={{marginLeft: 15, marginTop: 30}}>{coin.name}</span><span style={{marginLeft: 15, float: 'right', marginTop: 30}}>${coin.price.toFixed(2)}</span>
                  </div>
              })}  
            </div>
          </Col>
        </Row>

        <Modal isOpen={this.state.isModalOpen} toggle={this.handleBuyClick} >
          <ModalHeader>Buy</ModalHeader>
          <ModalBody>
         
            <div className="inputs">
              <div style={{ display: 'flex'}}>
              <InputGroup >
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input onChange={this.handleOnChange} name="purchaseAmount" placeholder="Amount" min={0} max={1000} type="number" step="1" />
              <InputGroupAddon addonType="append">.00</InputGroupAddon>
              </InputGroup>

              </div>
            
              <StripeProvider apiKey="pk_test_8bbC7B605qDELV8i8e3ZuW7U007yMC4TBG">
                <Elements>
                  <CheckoutForm ref={this.formRef} loggedInUserId={this.props.loggedInUserId} coinId={this.props.history.location.state.selectedCoin.id} amount={this.state.purchaseAmount}/>
                </Elements>
              </StripeProvider>
            </div>
          
          </ModalBody>
          <ModalFooter>
          <p>{this.props.history.location.state.selectedCoin.symbol} Amount: {Number(this.state.purchaseAmount / this.props.history.location.state.selectedCoin.price).toFixed(2)} </p>

            <Button color="primary" >Buy {this.props.history.location.state.selectedCoin.symbol}</Button>
            <Button color="secondary" onClick={() => this.setState({ isModalOpen: false })}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
      </Container>
    )
  }
}




// NOTE:
// portolio: {
//   BTC: {
//     amount: 10000
//   },
//   ETH: {
//     amount: 13993
//   },
//   BCH: {
//     amount: 203
//   }
// }




