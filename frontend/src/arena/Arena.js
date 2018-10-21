import React, { Component } from 'react';
import {connect} from 'react-redux';


class Arena extends Component {

  state = {}

  componentDidMount = () => {
  }

  render(){
    return (
      <div>
      ddd
      </div>
    );
  }
}

const mapStoreToProps = (state, ownProps) => {
  return {
  }
}

export default connect(
  mapStoreToProps
)(Arena);
