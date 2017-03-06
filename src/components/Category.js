import React, { Component } from 'react';

class Category extends Component {
  render() {
    return (
      <div className="Category" data-category={this.props.category.name} onClick={this.props.handleCategoryClick}>
        {this.props.category.name}
      </div>
    );
  }
}

export default Category;
