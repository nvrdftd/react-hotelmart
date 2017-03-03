import React, { Component } from 'react';
import request from 'superagent';
import Recommended from './Recommended';
import Cart from './Cart';
import Search from './Search';
import API_ENDPOINT from '../config';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      home_address: '',
      isAuthenticated: false,
      cart: [],
      loginStatus: 'Log In',
      signupStatus: 'Sign up',
      opStatus: '',
      loginErr: '',
      signupErr: ''
    }
    this.showWhichComponent = this.showWhichComponent.bind(this);
    this.handleCredentials = this.handleCredentials.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserSignup = this.handleUserSignup.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  componentDidMount() {
    let nextState = this.state;
    request.get(API_ENDPOINT + '/user/session')
      .withCredentials()
      .then(res => {
        nextState.isAuthenticated = res.body.isAuthenticated;
        if (nextState.isAuthenticated) {
          request.get(API_ENDPOINT + '/user/cart/retrieve')
            .withCredentials()
            .then(res => {
              nextState.cart = res.body.cart;
              this.setState(nextState);
            });
        }
      }).catch(err => console.log(err))
  }

  handleCredentials(event) {
    let nextState = this.state;
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleUserSignup(event) {
    let nextState = this.state;
    const username = this.state.username,
          password = this.state.password,
          firstname = this.state.firstname,
          lastname = this.state.lastname,
          home_address = this.state.home_address;

    event.preventDefault();
    nextState.signupStatus = 'Processing';
    this.setState(nextState);
    request.post(API_ENDPOINT + '/user/register')
      .withCredentials()
      .send({ username, password, firstname, lastname, home_address })
      .then(res => {
        nextState.isAuthenticated = res.body.isAuthenticated;
        nextState.signupErr = '';
        nextState.username = '';
        nextState.password = '';
        nextState.fisrtname = '';
        nextState.lastname = '';
        nextState.signupStatus = 'Sign up';
        request.post(API_ENDPOINT + '/user/cart/update')
          .withCredentials()
          .send({ cart: nextState.cart })
          .then(res => {
            nextState.opStatus = res.body.opStatus;
            this.setState(nextState);
          });
      }).catch(err => {
        nextState.password = '';
        nextState.signupErr = 'Existing account or incomplete info.';
        nextState.signupStatus = 'Sign up';
        this.setState(nextState);
      });
  }

  handleUserLogin(event) {
    let nextState = this.state,
        username = this.state.username,
        password = this.state.password;

    event.preventDefault();
    nextState.loginStatus = 'Authenticating';
    this.setState(nextState);

    request.post(API_ENDPOINT + '/user/login')
      .withCredentials()
      .send({ username, password })
      .then(res => {
        nextState.isAuthenticated = res.body.isAuthenticated;
        nextState.loginErr = '';
        nextState.loginStatus = 'Log In';
        request.post(API_ENDPOINT + '/user/cart/update')
          .withCredentials()
          .send(nextState.cart)
          .then(res => {
            nextState.opStatus = res.body.opStatus;
            this.setState(nextState);
          });
      }).catch(err => {
        nextState.username = '';
        nextState.password = '';
        nextState.loginErr = 'Please make sure that you enter them right.';
        nextState.loginStatus = 'Log in';
        this.setState(nextState);
      });
  }

  handleAddItem(event) {
    let nextState = this.state,
        cart = this.state.cart;

    const target = event.target;

    if (target.quantity !== 0) {
      const item = {
        _id: target.dataset._id,
        name: target.dataset.name,
        quantity: target.dataset.quantity
      };

      if (cart.length === 0) {
        cart.push(item);
      } else {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i]._id === item._id) {
            cart[i].quantity = item.quantity;
            break
          }
          if (i === cart.length - 1) {
            cart.push(item);
          }
        }
      }
      nextState.cart = cart;
      request.post(API_ENDPOINT + '/user/cart/update')
        .withCredentials()
        .send({ cart: nextState.cart })
        .then(res => {
          nextState.opStatus = res.body.opStatus;
        });
      this.setState(nextState);
    }
    console.log(this.state)
  }

  handleItemChange(event) {
    let nextState = this.state,
        cart = this.state.cart;
    const target = event.target;

    for (var i = 0; i < cart.length; i++) {
      if (cart[i]._id === target.dataset._id) {
        if (+target.value !== 0) {
          cart[i].quantity = target.value;
        } else {
          cart.splice(i, 1);
        }
        nextState.cart = cart;
        this.setState(nextState);
        if (this.state.isAuthenticated) {
          request.post(API_ENDPOINT + '/user/cart/update')
            .withCredentials()
            .send({ cart: nextState.cart })
            .then(res => {
              nextState.opStatus = res.body.opStatus;
              this.setState(nextState);
            });
        }
        break;
      }
    }
  }

  showWhichComponent() {
    if (this.props.isCartToggled) {
      return (<Cart handleItemChange={this.handleItemChange}
                    handleCredentials={this.handleCredentials}
                    handleUserLogin={this.handleUserLogin}
                    handleUserSignup={this.handleUserSignup}
                    isAuthenticated={this.state.isAuthenticated}
                    loginStatus={this.state.loginStatus}
                    signupStatus={this.state.signupStatus}
                    cart={this.state.cart}
                    username={this.state.username}
                    password={this.state.password}
                    lastname={this.state.lastname}
                    firstname={this.state.fisrtname}
                    home_address={this.state.home_address}
                    loginErr={this.state.loginErr}
                    signupErr={this.state.signupErr} />);
    } else if (this.props.isSearchToggled) {
      return (<Search />);
    }
    return (<Recommended handleAddItem={this.handleAddItem}/>);
  }

  render() {
    return (
      <div className="Carousel">
        <div className="numOfItem">{this.state.cart.length}</div>
        {this.showWhichComponent()}
      </div>
    );
  }
}

export default Carousel;
