import React from 'react';

import reducer from './reducer';
import Login from './components/login';
import Register from './components/register';
import Logout from './components/logout';

import {status as headerViewStatus} from '../shell/components/header';


const User=({viewStatus})=>{
  switch (viewStatus) {
    case headerViewStatus.HEADER_VIEW_STATUS_LOGIN:
      return <Login />;
    case headerViewStatus.HEADER_VIEW_STATUS_REGISTER:
      return <Register />;
    case headerViewStatus.HEADER_VIEW_STATUS_LOGOUT:
      return <Logout />
    case headerViewStatus.HEADER_VIEW_STATUS_NONE:
    default:
      return null;
  }
};

export default User;

export {reducer};