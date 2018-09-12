import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {loadEvents} from '../model/actions/eventAction'
import './EventList.scss'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


class EventList extends Component{
  constructor(props){
    super(props);
    this.props.dispatch(loadEvents());
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
                color="primary" onClick={ ()=> this.handleClick(event)} >
              更新
            </Button>
          </div>
        </ListItem>
      );
    });

    return (
      <div>
        {eventlist}
        <div className = "addbutton">
          <Button  variant="fab" mini color="secondary" aria-label="Add" >
            <AddIcon />
          </Button>
        </div>
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
 