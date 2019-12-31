import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import './App.css';
import NavbarComponent from './NavbarComponent';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Prices from './Prices';
import CoinDetail from './CoinDetail';
import Watchlist from './Watchlist';
// import React, { useState } from 'react';
export default class App extends Component {

  state = {
    token: localStorage.token,
    loggedInUserId: localStorage.userId,
    watchlistCoins: localStorage.watchlistCoins ? JSON.parse(localStorage.watchlistCoins) : [],
    coins: []
    // favoriteItems: localStorage.favoriteItems
  }


  // async componentDidMount() {
    

  //   // const response = await fetch(`http://localhost:3000/users/${this.state.loggedInUserId}`)
  //   const data = await response.json()
  //   // console.log(data)
  //     const arr = data.filter(coin => {
  //     return coin.user.id === parseInt(this.state.loggedInUserId)
  //     // watchlistCoins: data.favorite_coins,
  //     // token: localStorage.token,
  //     // loggedInUserId: localStorage.userId
  //   })
  //   this.setWatchlistCoins(arr)
  //   }
  

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3000/coins')
      const data = await response.json()
      this.setState({ 
        coins: data,
      })
    } catch (error) {
      this.setState({
        coins: []
      })
    }
  }

  setWatchlistCoins = (arr) => {
    localStorage.watchlistCoins = JSON.stringify(arr)

    this.setState({
      watchlistCoins: arr
    })
  }
  
  // componentDidMount(){
  //     this.setState({
  //       token: localStorage.token,
  //       loggedInUserId: localStorage.userId
  //     })
  //   }

  setToken = ({ token, user_id })  =>{
    localStorage.token = token
    localStorage.userId = user_id

    this.setState({
      token: token,
      loggedInUserId: user_id
    })
  }

  logOutClick = () => {
    localStorage.clear()

    this.setState({
      loggedInUserId: null,
      token: null,
      watchlistCoins: []
    })
  }

  addToWatchlist = (selectedCoin) => {
    console.log('state', this.state)
    console.log('selectedcoin', selectedCoin)
    if (!!this.state.token && !this.state.watchlistCoins.find(element => element.coin.id === selectedCoin.id)) {
        fetch('http://localhost:3000/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.state.loggedInUserId,
          coin_id: selectedCoin.id
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          watchlistCoins: [...this.state.watchlistCoins, data],
          // favoriteItems: data
        })
      })
  } else if (!this.state.token) {
    alert("you must login")
  } else {
    alert("you are already following this coin")
  }
}

removeFromWatchlist = (id) => {
  fetch(`http://localhost:3000/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  this.setState({
    watchlistCoins: this.state.watchlistCoins.filter(element => element.id !== id)
  })
  // .then(response => response.json())
  // .then(data => {
  //   debugger
  // })
}

buyCoin = () => {
  console.log('clicked')
  

}

  render() {

    console.log(this.state.watchlistCoins)
    console.log(this.state.favoriteItems)
    return (
      <div>
        <Router>
      <div>
        <NavbarComponent logOutClick={this.logOutClick} 
                          token={this.state.token}/>
        <Switch>

          <Route path="/signup">
            <Signup setToken={this.setToken} 
                    token={this.state.token}/>
          </Route>

          <Route path="/login">
            <Login loggedInUserId={this.state.loggedInUserId} 
                    setToken={this.setToken} token={this.state.token} 
                    setWatchlistCoins={this.setWatchlistCoins} />
          </Route>

          <Route path="/dashboard">
            <Dashboard token={this.state.token}/>
          </Route>

          <Route path="/prices" component={(navProps) => <Prices {...navProps} coins={this.state.coins} /> }>
            {/* <Prices token={this.state.token}/> */}
          </Route>
          
          <Route path="/coin-detail" 
            component={(navProps) => <CoinDetail {...navProps} 
                                        token={this.state.token} 
                                        loggedInUserId={this.state.loggedInUserId} 
                                        addToWatchlist={this.addToWatchlist} 
                                        watchlistCoins={this.state.watchlistCoins}
                                        buyCoin={this.buyCoin}/>}>
          </Route>

          <Route path="/watchlist" component={navProps => <Watchlist loggedInUserId={this.state.loggedInUserId}
                        coins={this.state.coins} 
                        token={this.state.token} 
                        watchlistCoins={this.state.watchlistCoins}
                        removeFromWatchlist={this.removeFromWatchlist}
                        {...navProps}
                        />} >
            
          </Route>

          <Route path="/">
            <LandingPage />
          </Route>

        </Switch>
      </div>
    </Router>   
  </div>
    )
  }
}


