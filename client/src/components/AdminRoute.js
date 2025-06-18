import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    return decoded.isAdmin ? children : <Navigate to="/" />;
  } catch {
    return <Navigate to="/login" />;
  }
}
