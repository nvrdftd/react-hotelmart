import React, { Component } from 'react';
import search_icon from '../search-01.png';
import shop_cart_icon from '../shop_cart-01.png';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <div className="Headline">Hotelmart</div>
        <img src={search_icon} alt="Search" width="30" height="30" onClick={this.props.handleClick}/>
        <img src={shop_cart_icon} alt="ShopCart" width="30" height="30" onClick={this.props.handleClick}/>
      </div>
    );
  }
}

export default Sidebar;
