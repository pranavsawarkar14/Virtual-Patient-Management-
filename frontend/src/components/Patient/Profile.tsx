import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

interface ProfileData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
  };
  medicalInfo: {
    conditions: string[];
    medications: string[];
    allergies: string[];
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    trialAlerts: boolean;
  };
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      firstName: user?.username?.split(' ')[0] || '',
      lastName: user?.username?.split(' ')[1] || '',
      email: user?.email || '',
      phone: '',
      dateOfBirth: '',
      gender: ''
    },
    medicalInfo: {
      conditions: [],
      medications: [],
      allergies: [],
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    },
    preferences: {
      notifications: true,
      emailUpdates: true,
      trialAlerts: true
    }
  });

  const handleInputChange = (section: keyof ProfileData, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'medical', label: 'Medical Info', icon: '🏥' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' }
  ];

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="profile-content">
        {activeTab === 'personal' && (
          <div className="tab-content">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={profileData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={profileData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={profileData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={profileData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  value={profileData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="tab-content">
            <h2>Medical Information</h2>
            <div className="medical-sections">
              <div className="medical-section">
                <h3>Medical Conditions</h3>
                <div className="tags-input">
                  {profileData.medicalInfo.conditions.map((condition, index) => (
                    <span key={index} className="tag">
                      {condition}
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newConditions = profileData.medicalInfo.conditions.filter((_, i) => i !== index);
                            handleInputChange('medicalInfo', 'conditions', newConditions);
                          }}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="Add condition..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          const newConditions = [...profileData.medicalInfo.conditions, e.currentTarget.value.trim()];
                          handleInputChange('medicalInfo', 'conditions', newConditions);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="medical-section">
                <h3>Current Medications</h3>
                <div className="tags-input">
                  {profileData.medicalInfo.medications.map((medication, index) => (
                    <span key={index} className="tag">
                      {medication}
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newMedications = profileData.medicalInfo.medications.filter((_, i) => i !== index);
                            handleInputChange('medicalInfo', 'medications', newMedications);
                          }}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="Add medication..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          const newMedications = [...profileData.medicalInfo.medications, e.currentTarget.value.trim()];
                          handleInputChange('medicalInfo', 'medications', newMedications);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="medical-section">
                <h3>Allergies</h3>
                <div className="tags-input">
                  {profileData.medicalInfo.allergies.map((allergy, index) => (
                    <span key={index} className="tag">
                      {allergy}
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newAllergies = profileData.medicalInfo.allergies.filter((_, i) => i !== index);
                            handleInputChange('medicalInfo', 'allergies', newAllergies);
                          }}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="Add allergy..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          const newAllergies = [...profileData.medicalInfo.allergies, e.currentTarget.value.trim()];
                          handleInputChange('medicalInfo', 'allergies', newAllergies);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="medical-section">
                <h3>Emergency Contact</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={profileData.medicalInfo.emergencyContact.name}
                      onChange={(e) => {
                        const newEmergencyContact = {
                          ...profileData.medicalInfo.emergencyContact,
                          name: e.target.value
                        };
                        handleInputChange('medicalInfo', 'emergencyContact', newEmergencyContact);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={profileData.medicalInfo.emergencyContact.phone}
                      onChange={(e) => {
                        const newEmergencyContact = {
                          ...profileData.medicalInfo.emergencyContact,
                          phone: e.target.value
                        };
                        handleInputChange('medicalInfo', 'emergencyContact', newEmergencyContact);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Relationship</label>
                    <input
                      type="text"
                      value={profileData.medicalInfo.emergencyContact.relationship}
                      onChange={(e) => {
                        const newEmergencyContact = {
                          ...profileData.medicalInfo.emergencyContact,
                          relationship: e.target.value
                        };
                        handleInputChange('medicalInfo', 'emergencyContact', newEmergencyContact);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="tab-content">
            <h2>Notification Preferences</h2>
            <div className="preferences-list">
              <div className="preference-item">
                <div className="preference-info">
                  <h3>Push Notifications</h3>
                  <p>Receive notifications about trial updates and messages</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={profileData.preferences.notifications}
                    onChange={(e) => handleInputChange('preferences', 'notifications', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h3>Email Updates</h3>
                  <p>Get email updates about your applications and new opportunities</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={profileData.preferences.emailUpdates}
                    onChange={(e) => handleInputChange('preferences', 'emailUpdates', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h3>Trial Alerts</h3>
                  <p>Receive alerts when new trials match your profile</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={profileData.preferences.trialAlerts}
                    onChange={(e) => handleInputChange('preferences', 'trialAlerts', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;