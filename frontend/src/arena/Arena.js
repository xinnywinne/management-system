import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {loadMap} from '../model/actions/mapAction';
import Button from '@material-ui/core/Button';

const BackGroundStyle = {
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
}

const SvgStyle = {
  height: '100%',
  width: '100%'
};

var preProps = {};
var svg = null;
var pt = null;

class Arena extends Component {

  state = {}

  constructor(props) {
    super(props);
    this.state = {
      arenaId: props.match.params.arena_id,
      buildingPaths: [],
    };
    console.log(this.state);
  }

  componentDidMount = () => {
    this.props.dispatch(loadMap(this.state.arenaId));
  }

  static getDerivedStateFromProps = (props, state) => {
    console.log('1111');
    console.log(props);
    console.log('222');
    console.log(state);
    if (preProps.map != props.map) {
      preProps = props;
      return {
        map: Object.assign({}, props.map)
      }
    }
    return null;
  }

  handleChange = (name) => (event) => {
    this.setState({
      map: Object.assign({}, this.state.map, {[name]: event.target.value})
    });
  }

  handleSave = () => {

  }

  handleUndoPoint = () => {
    if (this.state.buildingPaths.length > 0) {
      this.setState({
        buildingPaths: this.state.buildingPaths.slice(
          0, this.state.buildingPaths.length - 1)
      });
    }

  }

  handleSavePath = () => {

  }

  handleClick = (evt) => {
    if (!svg || !pt) {
      svg = document.getElementById("svgDoc");
      pt = svg.createSVGPoint();
    }
    function getSvgCoords(evt) {
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }
    this.setState({
      buildingPaths: [...this.state.buildingPaths, getSvgCoords(evt)]
    })
    console.log(getSvgCoords(evt));
  }

  render() {
    if (!this.props.map) {
      return '';
    }

    if (!this.state.map) {
      return '';
    }

    console.log(this.state);

    const imagePath = this.props.map && this.props.map.Img || '';

    const circles = this.state.buildingPaths.map((point, index) => {
      return (
        <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="10"
            fill="red"/>
      );
    });
    var polygon = '';
    if (this.state.buildingPaths.length > 2) {
      const polygonPoints = this.state.buildingPaths.reduce((cv, point) => {
        return `${cv} ${point.x},${point.y}`;
      }, '');
      polygon = (
        <polygon points={polygonPoints} fill="none" stroke="red" />
      );
    }

    return (
      <div className="list-container">
        <div>
          <form>
            <TextField
                fullWidth
                id="standard-name"
                label="名称"
                value={this.state.map.Name}
                onChange={this.handleChange('Name')}
                margin="normal"
            />
            <TextField
                fullWidth
                id="standard-uncontrolled"
                label="地址"
                value={this.state.map.Address}
                onChange={this.handleChange('Address')}
                margin="normal"
            />
            <TextField
                fullWidth
                id="standard-uncontrolled"
                label="背景图片"
                value={this.state.map.Img}
                onChange={this.handleChange('Img')}
                margin="normal"
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={this.handleSave}>
              保存
            </Button>
          </form>
          <div>
            <svg viewBox="0 0 4096 4096" style={SvgStyle}
                id="svgDoc"
                onClick={this.handleClick}>
              <image x="0"
                     y="0"
                     width="4096"
                     height="4096"
                     preserveAspectRatio="none"
                     xlinkHref={imagePath}
                     style={BackGroundStyle}
                     strokeWidth="1">
              </image>
              {circles}
              {polygon}
            </svg>
          </div>
          <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={this.handleUndoPoint}>
              取消
            </Button>
            <Button
                variant="outlined"
                color="primary"
                onClick={this.handleSavePath}>
              保存
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state, ownProps) => {
  return {
    map: state.maps.map
  }
}

export default connect(
  mapStoreToProps
)(Arena);
