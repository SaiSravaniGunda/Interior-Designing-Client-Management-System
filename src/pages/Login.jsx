import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');  // <-- Add error state

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');  // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/auth/login', credentials, {
        withCredentials: true, 
      });
      console.log(res.data);
      login(res.data.token, res.data.role);
      navigate('/');
    } catch (err) {
      console.error("Login failed", err);
      setError('Incorrect email or password. Please try again.'); // <-- Set error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="form-input" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="form-input" 
          onChange={handleChange} 
          required 
        />
        <button type="submit" className="submit-btn">Login</button>
      </form>
      {/* Conditionally render error message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
