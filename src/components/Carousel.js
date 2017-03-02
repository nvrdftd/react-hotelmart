import React, { Component } from 'react';
import Recommended from './Recommended';
import Cart from './Cart';
import Search from './Search';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.showWhichComponent = this.showWhichComponent.bind(this);
  }

  showWhichComponent() {
    if (this.props.isCartToggled) {
      return (<Cart />);
    } else if (this.props.isSearchToggled) {
      return (<Search />);
    }
    return (<Recommended />);
  }

  render() {
    return (
      <div className="Carousel">
        {this.showWhichComponent()}
      </div>
    );
  }
}

export default Carousel;
