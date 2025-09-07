import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
  onNavClick: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, isMobile, onNavClick, onLogout }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      path: '/patient-portal/dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,13H11V3H3M3,21H11V15H3M13,21H21V11H13M13,3V9H21V3" />
        </svg>
      ),
      label: 'Dashboard',
    },
    {
      path: '/patient-portal/trials',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19Z" />
        </svg>
      ),
      label: 'Available Trials',
    },
    {
      path: '/patient-portal/profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
      ),
      label: 'Profile',
    },
    {
      path: '/patient-portal/settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
      ),
      label: 'Settings',
    },
  ];

  return (
    <aside className={`patient-sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
      <div className="sidebar-header">
        <div className="patient-brand">
          <div className="brand-icon">
            <span className="logo-icon">🧬</span>
          </div>
          {!collapsed && (
            <div className="brand-text">
              <h3>ClinicalConnect</h3>
              <span>Patient Portal</span>
            </div>
          )}
        </div>
        {!isMobile && (
          <button
            className="sidebar-toggle"
            onClick={onToggle}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        )}
        {isMobile && (
          <button
            className="sidebar-close"
            onClick={() => onNavClick()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={onNavClick}
                title={collapsed && !isMobile ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="patient-profile">
          <div className="profile-avatar">
            <span>{user?.username?.charAt(0).toUpperCase()}</span>
          </div>
          {!collapsed && (
            <div className="profile-info">
              <div className="profile-name">{user?.username}</div>
              <div className="profile-role">Patient</div>
            </div>
          )}
        </div>
        <button
          className="logout-btn"
          onClick={onLogout}
          title="Logout"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;