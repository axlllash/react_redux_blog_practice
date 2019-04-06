import {
  TOGGLE_HEADER_STATUS_NONE,
  TOGGLE_HEADER_STATUS_LOGIN,
  TOGGLE_HEADER_STATUS_REGISTER,
  TOGGLE_HEADER_STATUS_LOGOUT
} from '.actionTypes';

import {
  HEADER_VIEW_STATUS_NONE,
  HEADER_VIEW_STATUS_LOGIN,
  HEADER_VIEW_STATUS_REGISTER,
  HEADER_VIEW_STATUS_LOGOUT
} from '.constants'

const initialState={
  viewStatus:HEADER_VIEW_STATUS_NONE
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HEADER_VIEW_STATUS_LOGIN:
      {
        return {
          viewStatus: HEADER_VIEW_STATUS_NONE,
          ...state
        }
      }
    case HEADER_VIEW_STATUS_REGISTER:
      {
        return {
          viewStatus: HEADER_VIEW_STATUS_REGISTER,
          ...state
        }
      }
    case HEADER_VIEW_STATUS_LOGOUT:
      {
        return {
          viewStatus: HEADER_VIEW_STATUS_LOGOUT,
          ...state
        }
      }
    case HEADER_VIEW_STATUS_NONE:
    default:
      {
        return{
          viewStatus:HEADER_VIEW_STATUS_NONE,
          ...state
        };
      }
  }
}