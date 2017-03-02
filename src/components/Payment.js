import React, { Component } from 'react';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeAddress: '',
      zipCode: '',
      cardNum: '',
      expDate: '',
      cvvCode: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {

  }

  handleChange(event) {
    let currentState = this.state;
    const target = event.target;
    currentState[target.name] = target.value;
    this.setState(currentState);
  }

  render() {
    return (
      <div className="Payment">
        <img src="../shoppingcart_checkout.png" alt="Checkout" width="50"/>
        <form onChange={this.handleChange}>
          <label>Home Address</label>
          <input type="text" name="homeAddress" pattern="[A-Za-z0-9,.]" required autoFocus/>
          <label>Zip Code</label>
          <input type="number" name="zipCode" pattern="[0-9]" maxLength="6" required autoFocus/>
          <label>Credit Card Number</label>
          <input type="number" name="cardNum" pattern="[0-9]" maxLength="16" required autoFocus/>
          <label>Expiration Date</label>
          <input type="month" name="expDate" required/>
          <label>CVV</label>
          <input type="number" name="cvvCode" pattern="[0-9]" maxLength="3" required/>
          <input type="submit" value="Continue" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}

export default Payment;
