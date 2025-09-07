import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
      logout(); // Logout locally even if API call fails
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Clinical Trial System</h1>
        {user && (
          <div className="header-user">
            <span className="user-info">
              Welcome, {user.username} ({user.role})
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;