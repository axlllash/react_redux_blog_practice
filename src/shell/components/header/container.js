import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../constants';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <User viewStatus={this.props.viewStatus} />
        {
          userName?
          (<p>`${userName}你好!`</p>
          <div role="logoutButton"
            onClick={this.props.changeToLogoutViewStatus}>注销
          </div>):
          (<div 
            role="loginButton" 
            onClick={this.props.changeToLoginViewStatus}>登录
          </div>
          <div 
            role="registerButton" 
            onClick={this.props.changeToRegisterViewStatus}>注册
          </div>)
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