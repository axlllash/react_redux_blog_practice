import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { login } from '../../action';
import * as status from '../../constants';

import { actionCreators as headerViewActionCreators } from '../../../shell/components/header';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      // 这个是用于页面切换，暂时还没有用到
      loginViewStatus: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(
      this.state.userName, 
      this.state.password, 
      false,
      ()=>{
        this.props.changeToNoneViewStatus();
      }
    );
  };

  render() {
    return (
      <div className="loginView">
        <div className="closeButton" onClick={this.props.changeToNoneViewStatus}>x</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="loginUserName">用户名</label>
          <input 
            type="text" 
            id="loginUserName" 
            name="userName" 
            onChange={this.handleChange} 
            value={this.state.userName} 
          />
          <label htmlFor="loginPassword">密码</label>
          <input 
            type="password" 
            id="loginPassword"
            name="password" 
            onChange={this.handleChange} 
            value={this.state.password} 
          />
          <input 
            type="submit" 
            id="loginButton" 
            value={
              this.props.loginStatus===status.LOGIN_STATUS_BEFORE_SUCCESS?
                '登录成功':(this.props.error?this.porps.error:'登录')
            } />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.user.loginStatus,
    error: state.user.error
  }
}
const mapDispatchToProps = {
  changeToNoneViewStatus: headerViewActionCreators.changeToNoneViewStatus,
  changeToLoginViewStatus: headerViewActionCreators.changeToLoginViewStatus,
  changeToRegisterViewStatus: headerViewActionCreators.changeToRegisterViewStatus,
  changeToLogoutViewStatus: headerViewActionCreators.changeToLogoutViewStatus,
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);