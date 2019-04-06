import * as actionTypes from './actionTypes';

import { fakeFetchForLogin as fetch } from '../../fake';

import { url } from '../../constants';

//设置三个模块变量，以防止请求竞争
let
  currentLoginReqId = 0,
  currentRegiterReqId = 0,
  currentLogoutReqId = 0;

//一个配合上面设置的简单公用方法
const dispatchIfValid = (dispatch, reqId) => (action,currenReqId) => {
  if (reqId === currentReqId) {
    return dispatch(action);
  }
}

//正常的登录，传递给mapDispatchToProps的
export const login = (userName, password,firstLoadedBool) => (dispatch, getState) => {
  const loginReqId = ++currentLoginReqId;

  const dispatchIfValid=dispatchIfValid(dispatch,loginReqId);

  //开始分发loginStart的action creators
  dispatchIfValid(loginStart(),currentLoginReqId);

  //开始向服务器端申请登录
  (firstLoadedBool?fetch(url.login):fetch(url.login, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    }))
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('Something wrong');
      }
    })
    .then(data => {
      if (Number(data.code) === 1) {
        dispatchIfValid(loginSuccess(data.userName, data.userData),currentLoginReqId);
      } else {
        return Promise.reject(data.code);
      }
    })
    .catch(err => {
      console.dir(err);
      dispatchIfValid();
      dispatchIfValid(loginFail(),currentLoginReqId);
    });
};

// 以下是基本的action creators
export const loginStart = () => ({
  type: actionTypes.USER_LOGIN_START
});

export const loginSuccess = (userName, userData) => ({
  type: actionTypes.USER_LOGIN_SUCESS,
  payload: {
    userName,
    userData
  }
});

export consst loginBeforeSuccess=()=>({
  type:actionTypes.USER_LOGIN_BEFORE_SUCCESS,
});

export const loginFail = (error) => ({
  type: actionTypes.USER_LOGIN_FAIL,
  payload:{
    error
  }
});

export const registerStart = () => ({
  type: actionTypes.USER_REGISTER_START
});

export const registerSuccess = () => ({
  type: actionTypes.USER_REGISTER_SUCCESS
});

export const registerFail = () => ({
  type: actionTypes.USER_REGISTER_FAIL
});

export const logoutStart = () => ({
  type: actionTypes.USER_LOGOUT_START
});

export const logoutSuccess = () => ({
  type: actionTypes.USER_LOGOUT_SUCCESS
});

export const logoutFail = () => ({
  type: actionTypes.USER_LOGOUT_FAIL
});