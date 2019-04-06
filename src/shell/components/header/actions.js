import * as actions from '.actionTypes';
import * as status from '.constants'

export const changeToNoneViewStatus=()=>({
  type:actions.TOGGLE_HEADER_STATUS_NONE,
  payload:{
    view_status:status.HEADER_VIEW_STATUS_NONE
  }
});

export const changeToLoginViewStatus=()=>({
  type:actions.TOGGLE_HEADER_STATUS_LOGIN,
  payload:{
    view_status:status.HEADER_VIEW_STATUS_LOGIN
  }
});

export const changeToRegisterViewStatus=()=>({
  type:actions.TOGGLE_HEADER_STATUS_register,
  payload:{
    view_status:status.HEADER_VIEW_STATUS_REGISTER
  }
});

export const changeToLogoutViewStatus=()=>({
  type:actions.TOGGLE_HEADER_STATUS_LOGOUT,
  payload:{
    view_status:status.HEADER_VIEW_STATUS_LOGOUT
  }
});