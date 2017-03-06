import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-css-transition-group';
import request from 'superagent';
import API_ENDPOINT from './config';
import './App.css';
import Sidebar from './components/Sidebar';
import Carousel from './components/Carousel';
import Search from './components/Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartToggled: false,
      isSearchToggled: false,
      items: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentDidMount() {
    let nextState = this.state;
    request.get(API_ENDPOINT + '/product/recommended')
      .withCredentials()
      .then(res => {
        nextState.items = res.body.items;
        this.setState(nextState);
      });
  }

  handleClick(event) {
    const target = event.target;
    let currentState = this.state;
    if (target.alt === 'ShopCart') {
      if (currentState.isCartToggled) {
        currentState.isCartToggled = false;
      } else {
        currentState.isCartToggled = true;
        currentState.isSearchToggled = false;
      }
    }

    if (target.alt === 'Search') {
      if (currentState.isSearchToggled) {
        currentState.isSearchToggled = false;
      } else {
        currentState.isSearchToggled = true;
        currentState.isCartToggled = false;
      }
    }
    this.setState(currentState);
  }

  handleSearchClick(event) {
    let nextState = this.state;
    const target = event.target;
    request.post(API_ENDPOINT + '/product/search')
      .withCredentials()
      .send({ text: target.dataset.text })
      .then(res => {
        if (res.body.items.length !== 0) {
          nextState.items = res.body.items;
        }
        nextState.isSearchToggled = false;
        this.setState(nextState);
      });
  }

  handleCategoryClick(event) {
    let nextState = this.state;
    const target = event.target;
    request.post(API_ENDPOINT + '/product/search')
      .withCredentials()
      .send({ category: target.dataset.category })
      .then(res => {
        if (res.body.items.length !== 0) {
          nextState.items = res.body.items;
        }
        nextState.isSearchToggled = false;
        this.setState(nextState);
      });
  }

  render() {
    let search = undefined;
    if (this.state.isSearchToggled) {
      function firstChild(props) {
        const childrenArr = React.Children.toArray(props.children);
        return childrenArr[0];
      }
      search = (
        <ReactTransitionGroup component={firstChild}
                              transitionName="search-panel"
                              transitionAppear={true}
                              transitionEnter={false}
                              transitionAppearTimeout={1000}
                              transitionLeaveTimeout={1000}>
          <Search handleSearchClick={this.handleSearchClick}
                  handleCategoryClick={this.handleCategoryClick} />
        </ReactTransitionGroup>
      );
    }


    return (
      <div className="App">
        <Sidebar handleClick={this.handleClick}/>
        {search}
        <Carousel isCartToggled={this.state.isCartToggled}
                  items={this.state.items} />
      </div>
    );
  }
}

export default App;
