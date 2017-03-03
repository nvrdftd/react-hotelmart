import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SelectedItem from './SelectedItem';
import Checkout from './Checkout';
import Login from './Login';
import checkout_icon from '../checkout-01.png'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckoutToggled: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.showWhichComponent = this.showWhichComponent.bind(this);
  }

  handleClick() {
    const nextState = this.state;
    if (this.state.isCheckoutToggled) {
      nextState.isCheckoutToggled = false;
    } else {
      nextState.isCheckoutToggled = true;
    }
    this.setState(nextState);
  }

  showWhichComponent() {
    if (this.props.isAuthenticated) {
      if (this.state.isCheckoutToggled) {
        return (
          <div className="Cart">
            <ReactCSSTransitionGroup
              transitionName="loginform"
              transitionEnterTimeout={1000}
              transitionLeave={false}>
              <Checkout />
            </ReactCSSTransitionGroup>
            <div className="CheckoutButton" onClick={this.handleClick}>
              <span>Checkout</span><img src={checkout_icon} alt="Checkout" width="25px"/>
            </div>
          </div>
        );
      } else {
        return (
          <div className="Cart">
            <ReactCSSTransitionGroup
              transitionName="selectedItem"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}>
              {this.props.cart.map(item => <SelectedItem key={item._id} item={item} handleItemChange={this.props.handleItemChange}/>)}
            </ReactCSSTransitionGroup>
            <div className="CheckoutButton" onClick={this.handleClick}>
              <span>Checkout</span><img src={checkout_icon} alt="Checkout" width="25px"/>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="Cart">
          <ReactCSSTransitionGroup
            transitionName="loginform"
            transitionEnterTimeout={1000}
            transitionLeave={false}>
            <Login handleCredentials={this.props.handleCredentials}
                   handleUserLogin={this.props.handleUserLogin}
                   handleUserSignup={this.props.handleUserSignup}
                   loginErr={this.props.loginErr}
                   signupErr={this.props.signupErr}
                   username={this.props.username}
                   password={this.props.password}
                   firstname={this.props.firstname}
                   lastname={this.props.lastname}
                   home_address={this.props.home_address}
                   loginStatus={this.props.loginStatus}
                   signupStatus={this.props.signupStatus} />
          </ReactCSSTransitionGroup>
          <div className="CheckoutButton" onClick={this.handleClick}>
            <span>Checkout</span><img src={checkout_icon} alt="Checkout" width="25px"/>
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
