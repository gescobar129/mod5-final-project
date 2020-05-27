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
    // console.log(this.props)
    if (!this.props.token) return <Redirect to='login' />
    return (

      <div>
        <span id="following">Following</span>
        <Row>
            {this.props.watchlistCoins.map(watchlistCoin => {
            return  <Col md="3" style={{ paddingBottom: 30 }} ><WatchlistCoinCard watchlistCoin={watchlistCoin} 
            key={watchlistCoin.id} 
            loggedInUserId={this.props.loggedInUserId}
            removeFromWatchlist={this.props.removeFromWatchlist}
            coins={this.props.coins}
            history={this.props.history}
            />
            </Col>
          })}
        </Row>
      </div>
      

        
    )
  }
}
