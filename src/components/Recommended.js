import React, { Component } from 'react';
import request from 'superagent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Item from './Item';
import API_ENDPOINT from '../config';

class Recommended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    request.get(API_ENDPOINT + '/product/recommended')
      .withCredentials()
      .then(res => {
        this.setState({
          items: res.body.items
        });
      });
  }

  render() {
    return (
      <div className="Recommended">
        <ReactCSSTransitionGroup
          transitionName="item"
          transitionEnterTimeout={2000}
          transitionLeave={false}>
          {this.state.items.map(item => <Item key={item._id}
                                              item={item}
                                              handleAddItem={this.props.handleAddItem} />)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Recommended;
