import * as actionTypes from './actionTypes';

import * as status from './constants';

const initialState = {
  userName: '',
  userData: '',
  loginStatus: status.LOGIN_STATUS_NOT_START,
  registerStatus: false,
  logoutStatus:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_START:
      {
        return {
          ...state,
          loginStatus: status.LOGIN_STATUS_START,
          error:'',
        }
      }
    case actionTypes.USER_LOGIN_SUCCESS:
      {
        return {
          ...state,
          loginStatus: status.LOGIN_STATUS_SUCCESS,
          userName: action.payload.userName,
          userData: action.payload.userData,
        }
      }
    case actionTypes.USER_LOGIN_BEFORE_SUCCESS:
      {
        return {
          ...state,
          loginStatus:status.LOGIN_STATUS_BEFORE_SUCCESS,
        }
      }
    case actionTypes.USER_LOGIN_FAIL:
      {
        return {
          ...state,
          loginStatus:status.LOGIN_STATUS_FAIL,
          loginStatusError:action.payload.error,
        }
      }
    default:
      {
        return state;
      }
  }
}