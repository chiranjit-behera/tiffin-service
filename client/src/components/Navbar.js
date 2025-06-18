import React from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Navbar({ onLogout }) {
  let userName = '';

  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        userName = decoded.name;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  } catch (err) {
    console.error('Invalid token:', err);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="/">Tiffin Service</a>
      
      <div className="collapse navbar-collapse justify-content-end">
        {userName && (
          <span className="navbar-text text-white me-3">
            👤 {userName}
          </span>
        )}
        <button className="btn btn-outline-light" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
