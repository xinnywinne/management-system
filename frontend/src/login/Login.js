import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.scss';


class Login extends Component {

  state = {}

  render(){
    return (
      <div className="form-container">
        <form>
          <TextField
              fullWidth
              id="name"
              name="name"
              label="用户名"
              value={this.state.name}
              margin="normal"/>
          <TextField
              fullWidth
              id="password"
              name="password"
              label="密码"
              type="password"
              value={this.state.name}
              margin="normal"/>
        </form>
        <Button variant="outlined" color="primary">
          登录
        </Button>
      </div>
    );
  }
}
export default Login;
