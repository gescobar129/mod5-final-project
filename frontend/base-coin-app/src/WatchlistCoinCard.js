import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Chart from './Chart'
// import {
//   Link
// } from "react-router-dom";
import './WatchlistCoinCard.css'

export default class WatchlistCoinCard extends Component {

  handleClick = () => {
    this.props.removeFromWatchlist(this.props.watchlistCoin.id)
  }

  render() {

    return (

        <Card>
        <CardBody>
          <CardTitle><img src={this.props.watchlistCoin.coin.img_url} style={{marginRight: 15}}></img>{this.props.watchlistCoin.coin.name}</CardTitle>
          {/* <CardSubtitle>{this.props.watchlistCoin.symbol}</CardSubtitle> */}
        </CardBody>
        <Chart coin={this.props.watchlistCoin.coin}/>
        {/* <img width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
        <CardBody>
          {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
          <div id="click-div">
            <Button color="info">View</Button>
            <Button onClick={this.handleClick} outline color="danger">Remove</Button>
          </div>
        </CardBody>
      </Card>

       
        
      
    )
  }
}
