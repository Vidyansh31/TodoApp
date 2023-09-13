import React, { useContext } from 'react';
import { Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const PrivateRoute: React.FC = () => {
  const authContext = AuthContext();
  const isAuth = authContext.isLoggedIn();

  return (
    isAuth ? <Outlet /> : <Navigate to = "/login" />
  )
};

export default PrivateRoute;
