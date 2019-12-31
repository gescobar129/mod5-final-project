import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import Search from './Search';
import "./Prices.css"

export default class Prices extends Component {

  state = {
    // coins: [],
    searchedCoins: this.props.coins
  }

  // async componentDidMount() {
  //   const response = await fetch('http://localhost:3000/coins')
  //   const data = await response.json()
  //   // debugger
  //   this.setState({ 
  //     // coins: data,
  //     searchedCoins: data,
  //   })
  // }

  onSearch = (searchTearm) => {
    this.setState({
      searchedCoins: this.props.coins.filter(element => element.name.toLowerCase().includes(searchTearm))
    })
  }

  handleClick = (coin) => {
      this.props.history.push('/coin-detail', {selectedCoin: coin, coinList: this.props.coins})
  }


  render() {
    console.log(this.props)
    return (
      <Container id="price-container" className="themed-container" fluid={true}>
        <Row>
          <Col id="search">
            <Search onSearch={this.onSearch}/>
          </Col>
        </Row>
        <Table hover>
          <thead>
            <tr >
              <th id="price-table">#</th>
              <th id="price-table">Name</th>
              <th id="price-table">Price</th>
              <th id="price-table">Change (24H)</th>
              <th id="price-table">Market Cap</th>
            </tr>
          </thead>
          {this.state.searchedCoins.sort((a,b) => {
            return a.rank-b.rank}).map(coin => { 
            return <tbody onClick = {() => this.handleClick(coin)}>
              <tr>
                <th scope="row" id="price-table">{coin.rank} </th>
                  <td id="table-items"><img alt="not found" className="coin-logo"src={coin.img_url}></img>{coin.name}<span style={{ marginLeft: 15}}>{coin.symbol}</span></td>
                  <td id="table-items">${coin.price > .99 ? coin.price.toFixed(2) : coin.price.toFixed(4)}</td>
                  <td id="table-items" style={{color: coin.percent_change_24h < 0 ? 'red' : 'green'}}>{coin.percent_change_24h.toFixed(2)}%</td>
                  <td id="table-items">${coin.market_cap}</td>
              </tr> 
            </tbody>
          })}
        </Table>
      </Container>
      
    )
  }
}
