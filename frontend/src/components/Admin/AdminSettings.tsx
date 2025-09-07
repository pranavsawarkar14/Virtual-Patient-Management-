import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminSettings.css';

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Profile Settings
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    organization: '',
    title: ''
  });

  // Security Settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true
  });

  // System Settings
  const [systemData, setSystemData] = useState({
    emailNotifications: true,
    trialAlerts: true,
    weeklyReports: true,
    maintenanceMode: false,
    autoBackup: true,
    dataRetention: '2years'
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSystemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSystemData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (securityData.newPassword !== securityData.confirmPassword) {
      setError('New passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Security settings updated successfully!');
      setSecurityData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      setError('Failed to update security settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSystem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('System settings updated successfully!');
    } catch (error) {
      setError('Failed to update system settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'system', label: 'System', icon: '⚙️' }
  ];

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <h1>Admin Settings</h1>
        <p>Manage your account and system preferences</p>
      </div>

      <div className="settings-content">
        {/* Tab Navigation */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="settings-panel">
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <form onSubmit={handleSaveProfile} className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={profileData.username}
                      onChange={handleProfileChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="organization">Organization</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={profileData.organization}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="title">Job Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={profileData.title}
                    onChange={handleProfileChange}
                  />
                </div>

                <button type="submit" disabled={loading} className="save-btn">
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <form onSubmit={handleSaveSecurity} className="settings-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                    />
                  </div>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="twoFactorEnabled"
                      checked={securityData.twoFactorEnabled}
                      onChange={handleSecurityChange}
                    />
                    <span className="checkmark"></span>
                    Enable Two-Factor Authentication
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="loginAlerts"
                      checked={securityData.loginAlerts}
                      onChange={handleSecurityChange}
                    />
                    <span className="checkmark"></span>
                    Email alerts for new logins
                  </label>
                </div>

                <button type="submit" disabled={loading} className="save-btn">
                  {loading ? 'Saving...' : 'Save Security Settings'}
                </button>
              </form>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="settings-section">
              <h2>System Settings</h2>
              <form onSubmit={handleSaveSystem} className="settings-form">
                <div className="settings-group">
                  <h3>Notifications</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={systemData.emailNotifications}
                        onChange={handleSystemChange}
                      />
                      <span className="checkmark"></span>
                      Email notifications
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="trialAlerts"
                        checked={systemData.trialAlerts}
                        onChange={handleSystemChange}
                      />
                      <span className="checkmark"></span>
                      Trial status alerts
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="weeklyReports"
                        checked={systemData.weeklyReports}
                        onChange={handleSystemChange}
                      />
                      <span className="checkmark"></span>
                      Weekly reports
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h3>System Management</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={systemData.maintenanceMode}
                        onChange={handleSystemChange}
                      />
                      <span className="checkmark"></span>
                      Maintenance mode
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="autoBackup"
                        checked={systemData.autoBackup}
                        onChange={handleSystemChange}
                      />
                      <span className="checkmark"></span>
                      Automatic backups
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataRetention">Data Retention Period</label>
                    <select
                      id="dataRetention"
                      name="dataRetention"
                      value={systemData.dataRetention}
                      onChange={handleSystemChange}
                    >
                      <option value="1year">1 Year</option>
                      <option value="2years">2 Years</option>
                      <option value="5years">5 Years</option>
                      <option value="indefinite">Indefinite</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="save-btn">
                  {loading ? 'Saving...' : 'Save System Settings'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;