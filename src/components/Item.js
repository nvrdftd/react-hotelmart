import React, { Component } from 'react';
import request from 'superagent';
import SelectQuantity from './SelectQuantity';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      operationStatus: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      quantity: target.value
    });
  }

  handleClick() {
    let currentState = this.state;
    if (this.state.quantity != 0) {
      let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const item = {
        _id: this.props.item._id,
        name: this.props.item.name,
        quantity: this.state.quantity
      };

      if (cart.length === 0) {
        cart.push(item);
      }

      for (var i = 0; i < cart.length; i++) {
        if (cart[i]._id == item._id) {
          cart[i].quantity = item.quantity;
          break
        }
        if (i === cart.length - 1) {
          cart.push(item);
        }
      }
      sessionStorage.setItem('cart', JSON.stringify(cart));
      request.post('http://localhost:3500/user/cart/add')
        .withCredentials()
        .send(cart)
        .then(res => {
          currentState.operationStatus = res.body.operationStatus
        });
      this.setState({
        quantity: 0
      });
    }
  }

  render() {
    return (
      <div className="Item">
          <img src="../product-icon.png" alt='ProductIcon' width="80" height="80"/>
          <section>{this.props.item.name}</section>
          <section>
            {this.props.item.category}
          </section>
            <SelectQuantity quantity={this.state.quantity} handleChange={this.handleChange}/>
          <img src="../add-01.png" alt='AddItem' width="20" height="20" onClick={this.handleClick}/>
      </div>
    );
  }
}

export default Item;
