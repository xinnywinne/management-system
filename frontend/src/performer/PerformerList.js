import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadAllPerformers} from '../model/actions/performerAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './PerformerList.scss';


class PerfomrerList extends Component {

  state = {}

  componentDidMount = () => {
    this.props.dispatch(loadAllPerformers());
  }

  render() {
    console.log(this.props.performers);
    const performers = this.props.performers;
    return (
      <div className="list-container performers-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
              <TableCell>简介</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {performers.map(row => {
              return (
                <TableRow key={row.Id}>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell>
                    {row.Description}
                  </TableCell>
                  <TableCell className="performers-action-container">
                    <Button variant="outlined" color="secondary">
                      删除
                    </Button>
                    <Button variant="outlined" color="primary">
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
    performers: state.performers,
  }
}

export default connect(
  mapStoreToProps
)(PerfomrerList);
