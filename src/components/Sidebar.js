import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <div className="Headline">Hotelmart</div>
        <img src="../search-01.png" alt="Search" width="30" height="30" onClick={this.props.handleClick}/>
        <img src="../shop_cart-01.png" alt="ShopCart" width="30" height="30" onClick={this.props.handleClick}/>
      </div>
    );
  }
}

export default Sidebar;
