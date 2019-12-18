import React, { Component } from 'react';
import {
Col, 
Row
} from 'reactstrap';
import {
  Redirect
} from "react-router-dom";
import WatchlistCoinCard from './WatchlistCoinCard'
import './Watchlist.css'

export default class Watchlist extends Component {

  // state = {
  //   favoriteCoins: []
  // }

  

  render() {
    // console.log(this.state.favoriteCoins)
    console.log(this.props)
    if (!this.props.token) return <Redirect to='login' />
    return (

      <Row>
        <Col xs="12" sm="4">
          <div id="fav-collection">
            {this.props.watchlistCoins.map(watchlistCoin => {
            return <WatchlistCoinCard watchlistCoin={watchlistCoin} key={watchlistCoin.id} loggedInUserId={this.props.loggedInUserId}/>
          })}
          </div>
        </Col>
      </Row>

        
    )
  }
}
