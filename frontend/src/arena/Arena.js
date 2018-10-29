import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
  loadMap,
  createMapSection,
  loadSections
} from '../model/actions/mapAction';
import Button from '@material-ui/core/Button';
import MapSection from './MapSection';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './arena.scss';


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
      modifySectionMode: true
    };
    console.log(this.state);
  }

  componentDidMount = () => {
    this.props.dispatch(loadMap(this.state.arenaId));
    this.props.dispatch(loadSections(this.state.arenaId));
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
    if (this.state.buildingPaths.length > 2) {
      const path = this.state.buildingPaths.reduce((cv, point, index) => {
        if (0 == index) {
          return `M${point.x},${point.y}`;
        } else {
          return `${cv}L${point.x},${point.y}`;
        }
      }, '');
      createMapSection(this.state.arenaId, {
        path: `${path}Z`,
        type: 'section',
      });
    }
  }

  handleSectionModeSwitch = () => {
    this.setState({
      modifySectionMode: !this.state.modifySectionMode
    });
  }

  handleClick = (evt) => {
    if (this.state.modifySectionMode) {
      return;
    }
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
  }

  render() {
    if (!this.props.map || !this.props.sections) {
      return '';
    }

    if (!this.state.map) {
      return '';
    }

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

    const paths = this.props.sections.map((section) => {
      var show = true;
      if (!!!section.Type) {
        // BBOX
        if (this.state.modifySectionMode) {
          // Modify
          show = false;
        }
      }
      return (<MapSection section={section} show={show}></MapSection>);
    });

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
            <FormGroup row>
              <FormControlLabel
                  control={
                    <Switch
                        checked={this.state.modifySectionMode}
                        onChange={this.handleSectionModeSwitch}/>}
                  label="修改已经存在区域模式"/>
            </FormGroup>
          </div>
          <div className="arena">
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
              {paths}
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
    map: state.maps.map,
    sections: state.maps.secitons
  }
}

export default connect(
  mapStoreToProps
)(Arena);
