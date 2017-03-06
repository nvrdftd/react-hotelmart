import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Item from './Item';

class Recommended extends Component {
  render() {
    return (
      <div className="Recommended">
        <ReactCSSTransitionGroup
          transitionName="item"
          transitionEnterTimeout={2000}
          transitionLeave={false}>
          {this.props.items.map(item => <Item key={item._id}
                                              item={item}
                                              handleAddItem={this.props.handleAddItem} />)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Recommended;
