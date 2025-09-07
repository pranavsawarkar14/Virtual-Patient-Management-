import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TrialProvider } from './context/TrialContext';
import Home from './components/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import PatientForm from './components/Patient/PatientForm';
import PatientPortal from './components/Patient/PatientPortal';
import AdminPortal from './components/Admin/AdminPortal';

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TrialProvider>
        <Router>
        <div className="App">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route 
                path="/patient-form" 
                element={
                  <ProtectedRoute requiredRole="patient">
                    <PatientForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient-portal/*" 
                element={
                  <ProtectedRoute requiredRole="patient">
                    <PatientPortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPortal />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        </Router>
      </TrialProvider>
    </AuthProvider>
  );
};

export default App;