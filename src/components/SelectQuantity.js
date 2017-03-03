import React, { Component } from 'react';

class SelectQuantity extends Component {
  constructor(props) {
    super(props);
    this.genOption = this.genOption.bind(this);
  }

  genOption(qty) {
    var option = [];
    for (var i = 0; i <= qty; i++) {
      option.push(<option key={i} value={i}>{i}</option>)
    }
    return option
  }

  render() {
    return (
      <select className="SelectQuantity"
              data-_id={this.props._id}
              value={this.props.quantity}
              onChange={this.props.handleItemChange}>
              {this.genOption(20)}
      </select>
    );
  }
}

export default SelectQuantity;
