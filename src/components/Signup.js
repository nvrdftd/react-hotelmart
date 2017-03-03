import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <div className="Signup">
        <form onChange={this.props.handleCredentials}>
          <label>E-mail Address (Username)</label>
          <input type="email" name="username" value={this.props.username} autoFocus/>
          <label>First Name</label>
          <input type="text" name="firstname" value={this.props.firstname} />
          <label>Last Name</label>
          <input type="text" name="lastname" value={this.props.lastname} />
          <label>Password</label>
          <input type="password" name="password" value={this.props.password}/>
          <label>Home Address</label>
          <input type="text" name="home_address" value={this.props.home_address} />
          <input type="submit" value={this.props.signupStatus} onClick={this.props.handleUserSignup}/>
          <input type="button" value="Cancel" onClick={this.props.handleClick}/>
        </form>
        <section className="SignupErr">{this.props.signupErr}</section>
      </div>
    );
  }
}

export default Signup;
