import React from 'react';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactSelect from 'react-select';
import './EventDialog.scss';
import {connect} from 'react-redux';
import {
  updateEvent
} from '../model/actions/eventAction';


function convertDatetoString(date) {
  const tmp = date.toISOString().split('T');
  return tmp[0] + ' ' + tmp[1].split('.')[0];
}

function convertToUTCString(date) {
  return date.split(' ')[0] + 'T' + date.split(' ')[1] + '.000Z';
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
          return performer.PerformerId === suggestion.performer.Id;
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

  handleSave = () => {
    console.log('save');
    const data = {};
    const eventId = this.props.selectedEvent.Id;
    const rawEvent = this.props.selectedEvent;
    const newEvent = this.state.event;
    console.log(this.props.selectedEvent);
    console.log(this.state);

    if (rawEvent.Name !== newEvent.Name) {
      data['Name'] = newEvent.Name;
    }

    if (rawEvent.Img !== newEvent.Img) {
      data['Img'] = newEvent.Img;
    }

    if (rawEvent.Description !== newEvent.Description) {
      data['Description'] = newEvent.Description;
    }

    if (rawEvent.UtcDateTime !== convertToUTCString(this.state.time)) {
      data['UtcDateTime'] = convertToUTCString(this.state.time);
    }

    if (rawEvent.MapId !== this.state.arena.value) {
      data['MapId'] = this.state.arena.value;
    }

    const rawPerformerIds = rawEvent.Performers.map((performer) => {
      return performer.PerformerId;
    });
    const newPerformerIds = this.state.performers.map((selected) => {
      return selected.performer.Id;
    });

    console.log(rawPerformerIds);
    console.log(newPerformerIds);

    if (!_.isEqual(rawPerformerIds.sort(), newPerformerIds.sort())) {
      data['removePerformers'] = _.difference(rawPerformerIds, newPerformerIds);
      data['addPerformers'] = _.difference(newPerformerIds,rawPerformerIds);
    }

    updateEvent(eventId, data).then((data) => {
      console.log(data);
    });

    this.props.onClose();
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
          <Button onClick={this.handleSave} color="primary" autoFocus>
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
