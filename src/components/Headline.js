import React, {Component} from 'react';

class Headline extends Component {
  render() {
    return (
      <div className="Headline">{this.props.headline}</div>
    );
  }
}

export default Headline;
