import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
  loadMap,
  createMapSection
} from '../model/actions/mapAction';
import Button from '@material-ui/core/Button';

const PathStyle = {
  'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)',
  'fillOpacity': 0.3,
  'strokeWidth': 0
};


class MapSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.section.Id,
      selected: false,
      path: {
        fill: this.props.section.Color || '1AC7C7',
        path: this.props.section.Path,
        stroke: '#000000',
        fillOpacity: 0.3,
        strokeWidth: 0,
        strokeOpacity: 0.3,
        style: PathStyle,
        type: this.props.section.Type
      }
    };
  }

  render() {

    if (!this.props.show) {
      return '';
    }
    
    return (
      <path className="section-path"
            fill={this.state.path.fill}
            stroke={this.state.path.stroke}
            d={this.state.path.path}
            id={this.props.section.Id}
            fillOpacity={this.state.path.fillOpacity}
            strokeWidth={this.state.path.strokeWidth}
            style={this.state.path.style}
            strokeOpacity={this.state.path.strokeOpacity}>
    </path>);
  }
}

export default MapSection;
