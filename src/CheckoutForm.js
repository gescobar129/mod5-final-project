import React, { Component } from 'react';
import { ModalFooter, Button } from 'reactstrap';
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {

  state = {
    complete: false
  }

  submit = async () => {
    let {token} = await this.props.stripe.createToken({name: 'Name'});
    let response = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      }, 
      body: JSON.stringify({
        token: token.id,
        user_id: this.props.loggedInUserId,
        coin_id: this.props.coinId,
        amount: this.props.amount
      })
    })

    if (response.ok) {
      this.setState({
        complete: true
      })
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete!</h1>

    return (
       <div className="checkout">
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    )
  }
}
export default injectStripe(CheckoutForm)
