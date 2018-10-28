import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadAllMaps} from '../model/actions/mapAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from "react-router-dom";


class ArenaList extends Component {

  state = {}

  componentDidMount = () => {
    this.props.dispatch(loadAllMaps());
  }

  handleModifyArena = (arenaId) => {
    this.props.history.push(`/arenas/${arenaId}`);
  }

  render(){
    console.log(this.props.maps);
    const maps = this.props.maps && this.props.maps.all || [];
    return (
      <div className="list-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
              <TableCell>地址</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maps.map(row => {
              return (
                <TableRow key={row.Id}>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell>
                    {row.Name}
                  </TableCell>
                  <TableCell className="action-container">
                    <Button variant="outlined" color="secondary">
                      删除
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {this.handleModifyArena(row.Id);}}>
                      修改
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="addbutton">
          <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              onClick={this.openDlg}>
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state, ownProps) => {
  return {
    maps: state.maps,
  }
}

export default connect(
  mapStoreToProps
)(withRouter(ArenaList));
