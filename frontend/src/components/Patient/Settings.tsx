import React, { useState } from 'react';
import './Settings.css';

const Settings: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Changing password');
    // Here you would handle password change
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account');
      // Here you would handle account deletion
    }
  };

  const handleExportData = () => {
    console.log('Exporting user data');
    // Here you would handle data export
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings</p>
      </div>

      <div className="settings-content">
        {/* Password Change */}
        <div className="settings-section">
          <h2>Change Password</h2>
          <div className="password-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <button className="btn-primary" onClick={handleChangePassword}>
              Change Password
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-section">
          <h2>Data Management</h2>
          <div className="data-actions">
            <div className="action-item">
              <div className="action-info">
                <h3>Export Your Data</h3>
                <p>Download a copy of all your data</p>
              </div>
              <button className="btn-secondary" onClick={handleExportData}>
                Export Data
              </button>
            </div>
            <div className="action-item danger">
              <div className="action-info">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all associated data</p>
              </div>
              <button className="btn-danger" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;