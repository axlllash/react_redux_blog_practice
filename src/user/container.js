import React from 'react';

import reducer from './reducer';

import {
  status as headerViewStatus
} from '../shell/components/header/actions';


const User({viewStatus})=>(
  let Component;
  switch (viewStatus) {
    case headerViewStatus.HEADERV_VIEW_LOGIN:
      Component=<Login />
      break;
    case headerViewStatus.HEADERV_VIEW_REGISTER:
      Component=<Register />
      break;
    case headerViewStatus.HEADERV_VIEW_LOGOUT:
      Component=<Logout />
      break;
    case headerViewStatus.HEADERV_VIEW_NONE:
    default:
      Component=null;
      break;
  }

  return (
    <Component />
  );
);

export default User;

export {reducer};