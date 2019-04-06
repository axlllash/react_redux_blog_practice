import * as actionTypes from './actionTypes';

import {
  LOGIN_STATUS_START,
  LOGIN_STATUS_SUCCESS,
  LOGIN_STATUS_FAIL
} from './constants';

const initialState = {
  userName: '',
  userData: '',
  loginStatus: false,
  registerStatus: false,
  logoutStatus:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_START:
      {
        return {
          loginStatus: LOGIN_STATUS_START,
          error:'',
          ...state
        }
      }
    case actionTypes.USER_LOGIN_SUCCESS:
      {
        return {
          loginStatus: LOGIN_STATUS_SUCCESS,
          userName: action.payload.userName,
          userData: action.payload.userData,
          ...state
        }
      }
    case actionTypes.USER_LOGIN_BEFORE_SUCCESS:
      {
        return {
          loginStatus:USER_LOGIN_BEFORE_SUCCESS,
          ...state
        }
      }
    case actionTypes.USER_LOGIN_FAIL:
      {
        return {
          loginStatus:LOGIN_STATUS_FAIL,
          loginStatusError:
          ...state
        }
      }
    default:
      {
        return state;
      }
  }
}