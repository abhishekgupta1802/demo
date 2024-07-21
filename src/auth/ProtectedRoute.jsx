// src/auth/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);

  const location = useLocation();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return children;
  }

  return (
    <RedirectMessage location={location} navigate={navigate} />
  );
};

const RedirectMessage = ({ location, navigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { state: { from: location } });
    }, 10);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div>
      <h2>Access Denied</h2>
      <p>You must be logged in to view this page. You will be redirected to the login page in 0.5 seconds.</p>
    </div>
  );
};

export default ProtectedRoute;
