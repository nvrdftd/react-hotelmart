import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSingup = this.handleSingup.bind(this);
  }

  handleSingup() {

  }

  render() {
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
            <section className="NeedAccount">Need an account? <strong onClick={this.handleSignup}>Sign up here!</strong></section>
            <input type="submit" value={this.props.buttonStatus} onClick={this.props.handleLogin}/>
          </form>
          <section className="LoginErr">{this.props.err}</section>
      </div>
    );
  }
}

export default Login;
