import React, { Component } from 'react';
import SelectQuantity from './SelectQuantity';


class SelectedItem extends Component {
  render() {
    return (
      <div className="Item">
          <img src="../product-icon.png" alt='ProductIcon' width="80" height="80"/>
          <section>{this.props.item.name}</section>
          <section>
            {this.props.item.category}
          </section>
          <SelectQuantity _id={this.props.item._id}
                          quantity={this.props.item.quantity}
                          handleItemChange={this.props.handleItemChange} />
      </div>
    );
  }
}

export default SelectedItem;
