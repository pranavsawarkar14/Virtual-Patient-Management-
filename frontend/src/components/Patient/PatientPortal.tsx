import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AvailableTrials from './AvailableTrials';
import Profile from './Profile';
import Settings from './Settings';
import './PatientPortal.css';

const PatientPortal: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="patient-portal">
      {/* Mobile Header */}
      {isMobile && (
        <header className="mobile-header">
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <div className="mobile-brand">
            <span className="logo-icon">🧬</span>
            <h3>Patient Portal</h3>
          </div>
          <div className="mobile-profile">
            <span>{user?.username?.charAt(0).toUpperCase()}</span>
          </div>
        </header>
      )}

      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        isMobile={isMobile}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
      />
      
      <div className={`portal-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/patient-portal/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trials" element={<AvailableTrials />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default PatientPortal;