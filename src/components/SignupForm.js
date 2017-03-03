import React, { Component } from 'react';

class SignupForm extends Component {
  render() {
    return (
      <div className="SignupForm">
        <form onChange={this.props.handleCredentials}>
          <label>E-mail</label>
          <input type="text" name="username" value={this.props.username} autoFocus/>
          <section className="SignupErr">{this.props.err}</section>
          <label>First Name</label>
          <input type="text" name="firstname" value={this.props.firstname} />
          <label>Last Name</label>
          <input type="text" name="lastname" value={this.props.lastname} />
          <label>Password</label>
          <input type="password" name="password" value={this.props.password}/>
          <section className="SignupErr">{this.props.err}</section>
          <input type="submit" value={this.props.buttonStatus} onClick={this.props.handleSignup}/>
          <input type="button" value="Cancel" onClick={this.props.handleSignup}/>
        </form>
        <section className="SignupErr">{this.props.err}</section>
      </div>
    );
  }
}

export default SignupForm;
