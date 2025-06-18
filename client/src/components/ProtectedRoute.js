// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    // Admin-only route check
    if (adminOnly && !decoded.isAdmin) return <Navigate to="/" />;

    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
