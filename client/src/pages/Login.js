import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      if (decoded.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center fw-bold mb-2">Welcome Back</h3>
        <p className="text-center text-muted mb-4">Please log in to continue</p>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
