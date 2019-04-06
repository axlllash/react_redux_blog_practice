import React, { Component, PropTypes } from 'react';

import { login } from '../action';

import { actionCreators as headerViewActionCreators } from '../../../shell/components/header';

class Login extends Component {
  constructor(props) {
    supre(props);
    this.state = {
      userName: '',
      password: '',
      loginViewStatus: '',
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  };

  handleUserNameChange(e) {
    this.setState({
      userName: '',
      ...this.state
    });
  };

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
      ...this.state
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    login(this.state.userName, this.state.password, false);
  };

  render() {
    return (
      <div className="loginView">
        <div className="closeButton" onClick={this.porps.changeToNoneViewStatus}>x</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="loginUserName">用户名</label>
          <input type="text" id="loginUserName" onChange={handleUserNameChange} value={this.state.userName} />
          <label htmlFor="loginPassword">密码</label>
          <input type="text" id="loginPassword" onChange={handlePasswordChange} value={this.state.password} />
          <input 
            type="button" 
            id="loginButton" 
            value={
              this.props.username?'登录成功':(this.props.error?this.porps.error:'登录失败')
            } />
        </form>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    loginStatus:state.user.loginStatus,
    error:state.user.error
  }
}
const mapDispatchToProps = {
  changeToNoneViewStatus: headerViewActionCreators.changeToNoneViewStatus,
  changeToLoginViewStatus: headerViewActionCreators.changeToLoginViewStatus,
  changeToRegisterViewStatus: headerViewActionCreators.changeToRegisterViewStatus,
  changeToLogoutViewStatus: headerViewActionCreatorss.changeToLogoutViewStatus
}