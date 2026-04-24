import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientLogin from './pages/PatientLogin';
import PatientPortal from './pages/PatientPortal';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-portal" element={<PatientPortal />} />
      </Routes>
    </Router>
  );
}

export default App;