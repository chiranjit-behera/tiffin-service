import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await API.post('/auth/register', form);
      alert("Registered successfully");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center fw-bold mb-2">Create an Account</h3>
        <p className="text-center text-muted mb-4">Join us and get delicious meals daily</p>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          className="btn btn-primary w-100 mt-2"
          onClick={registerUser}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
