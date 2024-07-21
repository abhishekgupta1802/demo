import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/login/login';
import './LoginPage.css'; // Assuming you have a separate CSS file for styles

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => {
    return state.login.error;
  });

  const isAuthenticated = useSelector(state => state.login.isAuthenticated);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login to Your Exam</h2>
       
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error" style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;