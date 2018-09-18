import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactSelect from 'react-select';
import './EventDialog.scss';
import {connect} from 'react-redux';

function convertDatetoString(date) {
  const tmp = date.toISOString().split('T');
  return tmp[0] + ' ' + tmp[1].split('.')[0];
}

class EventDialog extends React.Component {

  constructor(props) {
    super(props);
    if (!props.selectedEvent) {
      return;
    }
    let {Performers, UtcDateTime, MapId, ...event} = props.selectedEvent;

    const suggestions = this.props.performers.map((performer) => {
      return {
        label: performer.Name,
        value: performer.Name,
        performer: performer,
      };
    });

    const mapSuggestions = this.props.maps.map((m) => {
      return {
        label: m.Name,
        value: m.Id,
      }
    });

    this.state = {
      event: event,
      suggestions: suggestions,
      mapSuggestions: mapSuggestions,
      performers: Performers.map((performer) => {
        return suggestions.find((suggestion) => {
          return performer.Id === suggestion.performer.Id;
        })
      }),
      time: convertDatetoString(new Date(UtcDateTime)),
      arena: mapSuggestions.find((suggestion) => {
        return suggestion.value === MapId;
      })
    };
  }

  handlePerfomerChange = (selectedOption) => {
    this.setState({performers: selectedOption});
  }

  handleTimeChange = (event) => {
    this.setState({time: event.target.value});
  }

  handleArenaChange = (selectedOption) => {
    this.setState({arena: selectedOption});
  }

  handleChange = name => event => {
    this.setState({
      event: Object.assign({}, this.state.event, {[name]: event.target.value})
    });
  }

  render() {

    if (!this.props.selectedEvent) {
      return '';
    }

    return (
      <Dialog
          fullWidth={true}
          maxWidth="md"
          open= {this.props.open}>
        <DialogTitle>活动管理</DialogTitle>
        <DialogContent className="event-editor">
          <form>
            <TextField
                fullWidth
                label="活动名称"
                value={this.state.event.Name}
                onChange={this.handleChange('Name')}
                margin="normal" />
            <div className="react-select-lable">主角等</div>
            <ReactSelect
                fullWidth
                isClearable={false}
                options={this.state.suggestions}
                value={this.state.performers}
                onChange={this.handlePerfomerChange}
                placeholder="选择主角"
                isMulti
            />
            <div className="react-select-lable">体育馆</div>
            <ReactSelect
                fullWidth
                isClearable={false}
                options={this.state.mapSuggestions}
                value={this.state.arena}
                onChange={this.handleArenaChange}
                placeholder="选择体育馆"
            />
            <TextField
                fullWidth
                className="date-time"
                label="时间 YYYY-MM-DD HH:mm:ss"
                value={this.state.time}
                onChange={this.handleTimeChange}
                margin="normal" />
            <TextField
                fullWidth
                label="缩略图"
                value={this.state.event.Img}
                onChange={this.handleChange('Img')}
                margin="normal" />
            <div>
              <img className="preview" src={this.state.event.Img} alt=""/>
            </div>
            <TextField
                fullWidth
                multiline={true}
                label="简介"
                value={this.state.event.Description}
                onChange={this.handleChange('Description')}
                margin="normal" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary" autoFocus>
            关闭
          </Button>
          <Button onClick={this.props.onClose} color="primary" autoFocus>
            保存
          </Button>
        </DialogActions>
      </Dialog>);
  }
}


const mapStoreToProps = (state, ownProps) => {
  return {
    performers: state.performers,
    maps: state.maps,
  }
}

export default connect(
  mapStoreToProps
)(EventDialog);
