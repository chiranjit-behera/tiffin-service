// components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return children; // Not logged in, allow access

  try {
    const decoded = jwtDecode(token);
    // If logged in, redirect based on role
    return decoded.isAdmin ? <Navigate to="/admin" /> : <Navigate to="/" />;
  } catch (err) {
    // If token invalid, allow access to login/register
    return children;
  }
};

export default PublicRoute;
