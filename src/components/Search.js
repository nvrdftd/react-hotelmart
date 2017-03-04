import React, { Component } from 'react';
import request from 'superagent';
import ReactTransitionGroup from 'react-addons-css-transition-group';
import Category from './Category';
import API_ENDPOINT from '../config';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorylist: [],
      query: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let currentStatus = this.state;
    request.get(API_ENDPOINT + '/categorylist')
      .withCredentials()
      .then(res => {
        currentStatus.categorylist = res.body;
        this.setState(currentStatus);
      });
  }

  handleChange(event) {
    const target = event.target;
    let currentStatus = this.state;
    currentStatus.query = target.value;
    this.setState(currentStatus);
  }

  render() {
    return (
      <div className="Search">
        <form onChange={this.handleChange}>
          <input type="text" name="query" placeholder="Search"/>
        </form>
        <div>
          <ReactTransitionGroup component="div"
                                transitionName="categorylist"
                                transitionEnterTimeout={2000}
                                transitionLeave={false}>
                                {this.state.categorylist.map(category => <Category key={category._id} category={category} />)}
          </ReactTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Search;
