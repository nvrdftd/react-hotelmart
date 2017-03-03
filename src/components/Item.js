import React, { Component } from 'react';
import SelectQuantity from './SelectQuantity';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    }
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleResetQty = this.handleResetQty.bind(this);
  }

  handleResetQty(event) {
    this.props.handleAddItem(event)
    this.setState({
      quantity: 0
    });
  }

  handleItemChange(event) {
    let nextState = this.state;
    nextState.quantity = event.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div className="Item">
        <img src="../product-icon.png" alt='ProductIcon' width="80" height="80"/>
        <section>{this.props.item.name}</section>
        <section>
          {this.props.item.category}
        </section>
          <SelectQuantity quantity={this.state.quantity}
                          handleItemChange={this.handleItemChange} />
        <img src="../add-01.png"
             alt='AddItem'
             width="20"
             height="20"
             data-_id={this.props.item._id}
             data-name={this.props.item.name}
             data-quantity={this.state.quantity}
             onClick={this.handleResetQty} />
      </div>
    );
  }
}

export default Item;
