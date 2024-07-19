import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Views/LoginPage';
import Dashboard from './Views/Dashboard/DashboardPage';
import DashboardHome from './Views/Dashboard/HomePage';
import Contact from './Views/ContactPage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
        <Route path="/dashboard" element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />}>
          <Route path="" element={token ? <DashboardHome /> : <Navigate to="/login" />} />
          <Route path="contact" element={token ? <Contact /> : <Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
