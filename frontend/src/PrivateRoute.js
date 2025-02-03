import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from './StateContext';

const PrivateRoute = ({ children }) => {
    const { isAuth } = useStateContext(); 
  return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;