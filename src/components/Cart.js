import React, { Component } from 'react';
import request from 'superagent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SelectedItem from './SelectedItem';
import Checkout from './Checkout';
import Login from './Login';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
      isCheckoutToggled: false,
      buttonStatus: 'Log In',
      operationStatus: 'Cart is empty!',
      items: [],
      err: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCredentials = this.handleCredentials.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.showWhichComponent = this.showWhichComponent.bind(this);
  }

  componentWillMount() {
    let currentState = this.state;
    request.get('http://localhost:3500/user/session')
      .withCredentials()
      .then(res => {
        currentState.isAuthenticated = res.body.isAuthenticated;
        this.setState(currentState);
      });
  }

  componentDidMount() {
    let currentState = this.state;
    request.get('http://localhost:3500/user/cart')
      .withCredentials()
      .then(res => {
        currentState.items = res.body;
        this.setState(currentState);
      });
  }

  handleChange(event) {
    let currentState = this.state;
    let items = this.state.items;
    const target = event.target;
    for (var i = 0; i < items.length; i++) {
      if (items[i]._id == target.dataset._id) {
        if (target.value != 0) {
          items[i].quantity = target.value;
        } else {
          items.splice(i, 1);
        }
        sessionStorage.setItem('cart', JSON.stringify(items));
        currentState.items = items;
        if (this.state.isAuthenticated) {
          request.post('http://localhost:3500/user/cart/add')
            .withCredentials()
            .send(currentState.items)
            .then(res => {
              currentState.operationStatus = res.body.operationStatus;
              this.setState(currentState);
            });
        } else {
          this.setState(currentState);
        }
        break;
      }
    }
  }

  handleClick() {
    const currentState = this.state;
    if (this.state.isCheckoutToggled) {
      currentState.isCheckoutToggled = false;
    } else {
      currentState.isCheckoutToggled = true;
    }
    this.setState(currentState);
  }

  handleCredentials(event) {
    let currentState = this.state;
    const target = event.target;
    currentState[target.name] = target.value;
    this.setState(currentState);
  }

  handleLogin(event) {
    let currentState = this.state;
    let username = this.state.username,
        password = this.state.password;
    event.preventDefault();
    currentState.buttonStatus = 'Authenticating';
    this.setState(currentState);
    request.post('http://localhost:3500/user/login')
      .withCredentials()
      .send({ username, password })
      .then(res => {
        currentState.isAuthenticated = res.body.isAuthenticated;
        currentState.buttonStatus = '';
        request.post('http://localhost:3500/user/cart/add')
          .withCredentials()
          .send(currentState.items)
          .then(res => {
            currentState.operationStatus = res.body.operationStatus;
            this.setState(currentState);
          });
      }).catch(err => {
        currentState.username = '';
        currentState.password = '';
        currentState.err = 'Please make sure that you have entered them right.';
        currentState.buttonStatus = 'Log in';
        this.setState(currentState);
      });
  }

  showWhichComponent() {
    if (this.state.isCheckoutToggled) {
      if (this.state.isAuthenticated) {
        return (
          <div className="Cart">
            <ReactCSSTransitionGroup
              transitionName="loginform"
              transitionEnterTimeout={1000}
              transitionLeave={false}>
              <Checkout handleClick={this.handleClick}/>
            </ReactCSSTransitionGroup>
            <div className="CheckoutButton" onClick={this.handleClick}>
              <span>Checkout</span><img src="../checkout-01.png" alt="Checkout" width="25px"/>
            </div>
          </div>
        );
      } else {
        return (
          <div className="Cart">
            <ReactCSSTransitionGroup
              transitionName="loginform"
              transitionEnterTimeout={1000}
              transitionLeave={false}>
              <Login handleCredentials={this.handleCredentials}
                     handleLogin={this.handleLogin}
                     err={this.state.err}
                     username={this.state.username}
                     password={this.state.password}
                     buttonStatus={this.state.buttonStatus}/>
            </ReactCSSTransitionGroup>
            <div className="CheckoutButton" onClick={this.handleClick}>
              <span>Checkout</span><img src="../checkout-01.png" alt="Checkout" width="25px"/>
            </div>
          </div>
        );
      }

    } else {
      return (
        <div className="Cart">
          <ReactCSSTransitionGroup
            transitionName="selectedItem"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            {this.state.items.map(item => <SelectedItem key={item._id} item={item} handleChange={this.handleChange}/>)}
          </ReactCSSTransitionGroup>
          <div className="CheckoutButton" onClick={this.handleClick}>
            <span>Checkout</span><img src="../checkout-01.png" alt="Checkout" width="25px"/>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.showWhichComponent();
  }
}

export default Cart;
