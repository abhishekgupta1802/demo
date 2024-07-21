import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { QuizProvider } from './context/QuizContext';
import './styles/App.css';
import { useSelector } from 'react-redux';
import ProtectedRoute from './auth/ProtectedRoute';

const App = () => {
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);

  return (
    <QuizProvider>
      <Router>
        <LocationBasedContent isAuthenticated={isAuthenticated} />
      </Router>
    </QuizProvider>
  );
};

const LocationBasedContent = ({ isAuthenticated }) => {
  const location = useLocation();

  return (
    <main>
      <div className="flex flex-col min-h-screen">
      {location.pathname !== '/' && <Header /> }

      <div className="flex-grow">
      <Routes>
        {/* Error pages  */}
        <Route path="/404" element={<NotFoundPage />} />

        {/* Other Routes */} 
        <Route path="/" element={<LoginPage />} />
        <Route path="/quiz/:id" element={ <ProtectedRoute> <QuizPage /> </ProtectedRoute> } />
        <Route path="/results" element={ <ProtectedRoute> <ResultPage /> </ProtectedRoute> } />
        <Route path="/dashboard"  element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />

        {/* If route not  found */}
        <Route path="*" element={<Navigate to="/404" /> } />
      </Routes>
      </div>
      <Footer />
      </div>
    </main>
  );
};

export default App;