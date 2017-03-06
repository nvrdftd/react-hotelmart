import React, { Component } from 'react';
import SelectQuantity from './SelectQuantity';
import API_ENDPOINT from '../config';

class SelectedItem extends Component {
  render() {
    return (
      <div className="Item">
        <table>
          <tbody>
            <tr>
              <td rowSpan="2">
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
              <td>
                Descri ptionffff dfdfefdfih dfhdljfd jfid fdfd fdfd fdfd
              </td>
              <td>
                <SelectQuantity _id={this.props.item._id}
                                quantity={this.props.item.quantity}
                                handleItemChange={this.props.handleItemChange} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SelectedItem;
