import React, { Component } from 'react';
import SelectQuantity from './SelectQuantity';
import add_icon from '../add-01.png';
import API_ENDPOINT from '../config';

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
        <table>
          <tbody>
            <tr>
              <td rowSpan="3">
                <img src={API_ENDPOINT + this.props.item.img_path} alt='ProductIcon' width="80" height="80"/>
              </td>
              <td>
                {this.props.item.name}
              </td>
              <td>
                Quantity
              </td>
            </tr>
            <tr>
              <td rowSpan="2">
                Descri ptionffff dfdfefdfih dfhdljfd jfid fdfd fdfd fdfd
              </td>
              <td rowSpan="2">
                <SelectQuantity quantity={this.state.quantity}
                                handleItemChange={this.handleItemChange} />
              </td>
              <td rowSpan="2">
                <section>
                  <img src={add_icon}
                       alt='AddItem'
                       width="20"
                       height="20"
                       data-_id={this.props.item._id}
                       data-name={this.props.item.name}
                       data-quantity={this.state.quantity}
                       data-img_path={this.props.item.img_path}
                       onClick={this.handleResetQty} />
                </section>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Item;
