import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SignupForm from './SignupForm'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignupFormToggled: false,
      buttonStatus: "Sign Up"
    }
    this.handleSignup = this.handleSignup.bind(this);
    this.showWhichComponent = this.showWhichComponent.bind(this);
  }

  handleSignup() {
    let currentState = this.state;
    if (currentState.isSignupFormToggled) {
      currentState.isSignupFormToggled = false;
    } else {
      currentState.isSignupFormToggled = true;
    }
    this.setState(currentState);
  }

  showWhichComponent() {
    if (this.state.isSignupFormToggled) {
      return (<SignupForm buttonStatus={this.state.buttonStatus} handleSignup={this.handleSignup}/>);
    } else {
      return (
        <div className="Login">
            <img src="../login-01.png" alt="Login" width="50"/>
            <section className="LoginExplain">
              This will help you shop everywhere anytime, even with different devices.
            </section>
            <form onChange={this.props.handleCredentials}>
              <label>Username</label>
              <input type="text" name="username" value={this.props.username} autoFocus/>
              <label>Password</label>
              <input type="password" name="password" value={this.props.password}/>
              <section className="NeedAccount">
                Want an account? <u onClick={this.handleSignup}>Sign up here!</u>
              </section>
              <input type="submit" value={this.props.buttonStatus} onClick={this.props.handleLogin}/>
            </form>
            <section className="LoginErr">{this.props.err}</section>
        </div>
      );
    }
  }

  render() {
    return this.showWhichComponent();
  }
}

export default Login;
