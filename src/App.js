import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Carousel from './components/Carousel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartToggled: false,
      isSearchToggled: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const target = event.target;
    let currentState = this.state;
    if (target.alt === 'ShopCart') {
      if (currentState.isCartToggled) {
        currentState.isCartToggled = false;
      } else {
        currentState.isCartToggled = true;
        currentState.isSearchToggled = false;
      }
    }

    if (target.alt === 'Search') {
      if (currentState.isSearchToggled) {
        currentState.isSearchToggled = false;
      } else {
        currentState.isSearchToggled = true;
        currentState.isCartToggled = false;
      }
    }
    this.setState(currentState);
  }



  render() {
    return (
      <div className="App">
        {sessionStorage.setItem('cart', JSON.stringify([]))}
        <Sidebar handleClick={this.handleClick}/>
        <Carousel isCartToggled={this.state.isCartToggled}
                  isSearchToggled={this.state.isSearchToggled}/>
      </div>
    );
  }
}

export default App;
