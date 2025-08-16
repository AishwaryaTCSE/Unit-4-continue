import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import MentorDashboard from './pages/MentorDashboard';

const App = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/mentor" 
          element={currentUser ? <MentorDashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
