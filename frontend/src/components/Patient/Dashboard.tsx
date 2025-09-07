import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTrials } from '../../context/TrialContext';
import './Dashboard.css';

interface DashboardStats {
  appliedTrials: number;
  matchingTrials: number;
  profileCompletion: number;
  lastActivity: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getApplicationsCount, getRecentActivities } = useTrials();
  
  const [stats, setStats] = useState<DashboardStats>({
    appliedTrials: 0,
    matchingTrials: 5,
    profileCompletion: 75,
    lastActivity: 'Today'
  });

  const recentActivities = getRecentActivities(4);

  useEffect(() => {
    setStats(prev => ({
      ...prev,
      appliedTrials: getApplicationsCount()
    }));
  }, [getApplicationsCount]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        );
      case 'status_update':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
          </svg>
        );
      case 'match':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />
          </svg>
        );
      case 'profile':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
        );
      case 'assessment':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8L6,7M4,19H8L6,17M4,14H8L6,12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'new':
        return '#3498db';
      case 'completed':
        return '#27ae60';
      case 'approved':
        return '#27ae60';
      case 'rejected':
        return '#e74c3c';
      case 'under_review':
        return '#f39c12';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.username}!</h1>
        <p>Here's your clinical trial activity overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon applied">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.appliedTrials}</div>
            <div className="stat-label">Applied Trials</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon matching">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.matchingTrials}</div>
            <div className="stat-label">Matching Trials</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon profile">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.profileCompletion}%</div>
            <div className="stat-label">Profile Complete</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon activity">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.lastActivity}</div>
            <div className="stat-label">Last Activity</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <Link to="/patient-portal/trials" className="view-all-link">
              View All Trials
            </Link>
          </div>
          <div className="activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon" style={{ color: getStatusColor(activity.status) }}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-description">{activity.description}</div>
                    <div className="activity-date">{formatTimeAgo(activity.date)}</div>
                  </div>
                  <div className={`activity-status ${activity.status}`}>
                    {activity.status.replace('_', ' ')}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activity">
                <div className="no-activity-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />
                  </svg>
                </div>
                <p>No recent activity</p>
                <Link to="/patient-portal/trials" className="browse-trials-btn">
                  Browse Available Trials
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link to="/patient-portal/trials" className="action-card">
              <div className="action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <div className="action-content">
                <h3>Browse Trials</h3>
                <p>Find clinical trials that match your profile</p>
              </div>
            </Link>

            <Link to="/patient-portal/profile" className="action-card">
              <div className="action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
              </div>
              <div className="action-content">
                <h3>Update Profile</h3>
                <p>Keep your medical information current</p>
              </div>
            </Link>

            <Link to="/patient-form" className="action-card">
              <div className="action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <div className="action-content">
                <h3>Complete Assessment</h3>
                <p>Fill out your medical assessment form</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;