import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {loadEvents} from '../model/actions/eventAction';
import {loadAllTimezones} from '../model/actions/timezoneAction';
import {loadAllMaps} from '../model/actions/mapAction';
import {loadAllPerformers} from '../model/actions/performerAction';
import './EventList.scss';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EventDialog from './EventDialog';


class EventList extends Component{

  state = {
    open: false
  }

  constructor(props){
    super(props);
    this.props.dispatch(loadEvents());
    this.props.dispatch(loadAllTimezones());
    this.props.dispatch(loadAllMaps());
    this.props.dispatch(loadEvents());
    this.props.dispatch(loadAllPerformers());
  }

  openDlg = () => {
    this.setState({open: true});
    console.log('OPEN....');
  }

  onClose = () => {
    this.setState({
      open: false,
      selectedEvent: null
    });
  }

  onClickUpdate = (selectedEvent) => {
    this.setState({open: true, selectedEvent: selectedEvent});
  }

  render() {
    const eventlist = this.props.events.map((event, index) => {
      return (
        <ListItem className = "cont" key={index} >
          <div className = "left">
            <ListItemText
                style={{borderRight: '1px solid blue'}}
                primary={event.Date}
                secondary={event.StartTime}/>
          </div>
          <div className = "cent">
            <ListItemText
                primary={event.Name}
                secondary={event.Location} />
          </div>
          <div className = "right">
            <Button variant="outlined" size="medium"
                color="primary" onClick={ () => this.onClickUpdate(event)} >
              更新
            </Button>
          </div>
        </ListItem>
      );
    });

    return (
      <div>
        {eventlist}
        <div className="addbutton">
          <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              onClick={this.openDlg}>
            <AddIcon />
          </Button>
        </div>
        <EventDialog
            key={(this.state.selectedEvent && this.state.selectedEvent.Id) || ''}
            selectedEvent={this.state.selectedEvent}
            open={this.state.open}
            onClose={this.onClose} />
      </div>
    );
  }
};

const mapStoreToProps = (state, ownProps) => {
  return {
    events: state.events
  }
}

export default connect(
  mapStoreToProps
)(EventList);
