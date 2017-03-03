import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Signup from './Signup';
import login_icon from '../login-01.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignupFormToggled: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.showWhichComponent = this.showWhichComponent.bind(this);
  }

  handleClick() {
    let nextState = this.state;
    if (nextState.isSignupFormToggled) {
      nextState.isSignupFormToggled = false;
    } else {
      nextState.isSignupFormToggled = true;
    }
    this.setState(nextState);
  }

  showWhichComponent() {
    if (this.state.isSignupFormToggled) {
      return (<Signup handleCredentials={this.props.handleCredentials}
                      handleUserSignup={this.props.handleUserSignup}
                      signupErr={this.props.signupErr}
                      username={this.props.username}
                      password={this.props.password}
                      firstname={this.props.firstname}
                      lastname={this.props.lastname}
                      home_address={this.props.home_address}
                      signupStatus={this.props.signupStatus}
                      handleClick={this.handleClick} />
      );
    } else {
      return (
        <div className="Login">
          <img src={login_icon} alt="Login" width="50"/>
          <section className="LoginExplain">
            This will help you shop everywhere anytime, even with different devices.
          </section>
          <form onChange={this.props.handleCredentials}>
            <label>Username</label>
            <input type="text" name="username" value={this.props.username} autoFocus/>
            <label>Password</label>
            <input type="password" name="password" value={this.props.password}/>
            <section className="NeedAccount">
              Want an account? <u onClick={this.handleClick}>Sign up here!</u>
            </section>
            <input type="submit" value={this.props.loginStatus} onClick={this.props.handleUserLogin}/>
          </form>
          <section className="LoginErr">{this.props.loginErr}</section>
        </div>
      );
    }
  }

  render() {
    return this.showWhichComponent();
  }
}

export default Login;
