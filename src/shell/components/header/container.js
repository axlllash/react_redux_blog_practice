import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from '../../../user';

import * as actionCreators from './actions';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <User viewStatus={this.props.viewStatus} />
        {
          this.props.userName?
          [<p key="hello">{`${this.props.userName}你好!`}</p>,
          <div 
            key="logoutButton"
            role="logoutButton"
            onClick={this.props.changeToLogoutViewStatus}>注销
          </div>]:
          [<div 
            key="loginButton"
            role="loginButton" 
            onClick={this.props.changeToLoginViewStatus}>登录
          </div>,
          <div 
            key="registerButton"
            role="registerButton" 
            onClick={this.props.changeToRegisterViewStatus}>注册
          </div>]
        }
      </header>
    );
  }
};

const mapStateToProps=(state)=>{
  const userState=state.user;
  const headerState=state.header;
  return {
    viewStatus:headerState.viewStatus,
    userName:userState.userName,
    userData:userState.userData
  }
}

const mapDispatchToProps={
  changeToNoneViewStatus:actionCreators.changeToNoneViewStatus,
  changeToLoginViewStatus:actionCreators.changeToLoginViewStatus,
  changeToRegisterViewStatus:actionCreators.changeToRegisterViewStatus,
  changeToLogoutViewStatus:actionCreators.changeToLogoutViewStatus
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);