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
      text: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    let nextState = this.state;
    request.get(API_ENDPOINT + '/categorylist')
      .withCredentials()
      .then(res => {
        nextState.categorylist = res.body;
        this.setState(nextState);
      });
  }

  handleSearchChange(event) {
    let nextState = this.state;
    const target = event.target;
    nextState.text = target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div className="Search">
        <input type="text" name="text" placeholder="Search" onChange={this.handleSearchChange} />
        <button className="SearchButton" data-text={this.state.text} onClick={this.props.handleSearchClick}>Search</button>
        <ReactTransitionGroup component="div"
                              transitionName="categorylist"
                              transitionEnterTimeout={3000}
                              transitionLeave={false}>
                              {this.state.categorylist.map(category => <Category key={category._id} category={category} handleCategoryClick={this.props.handleCategoryClick}/>)}
        </ReactTransitionGroup>
      </div>
    );
  }
}

export default Search;
