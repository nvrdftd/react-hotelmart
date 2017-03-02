import React, { Component } from 'react';

class Category extends Component {
  render() {
    return (
      <div className="Category">
        {this.props.category.name}
      </div>
    );
  }
}

export default Category;
