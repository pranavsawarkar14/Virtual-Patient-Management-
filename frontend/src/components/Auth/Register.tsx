import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import './Register.css';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  medicalConditions: string;
  privacyConsent: boolean;
  role: 'patient' | 'admin';
}

const Register: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patient' | 'organization'>('patient');
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    medicalConditions: '',
    privacyConsent: false,
    role: 'patient'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleTabChange = (tab: 'patient' | 'organization') => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      role: tab === 'patient' ? 'patient' : 'admin'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.privacyConsent) {
      setError('Please accept the privacy policy to continue.');
      setLoading(false);
      return;
    }

    try {
      // Create username from email for backend compatibility
      const registrationData = {
        username: formData.email,
        password: formData.password,
        role: formData.role
      };

      const response = await authAPI.register(registrationData);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (success) {
    return (
      <div className="register-page">
        {/* Navigation Header */}
        <nav className="main-nav">
          <div className="nav-container">
            <div className="nav-brand">
              <div className="brand-logo">
                <span className="logo-icon">🧬</span>
                <span className="brand-name">Clinical Trial System</span>
              </div>
            </div>
            
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </div>

            <div className="nav-actions">
              <Link to="/login" className="nav-btn signin-btn">Sign In</Link>
              <Link to="/register" className="nav-btn primary-btn active">Get Started</Link>
            </div>
          </div>
        </nav>

        <div className="register-container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully. Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      {/* Navigation Header */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-logo">
              <span className="logo-icon">🧬</span>
              <span className="brand-name">Clinical Trial System</span>
            </div>
            
          </div>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="nav-btn signin-btn">Sign In</Link>
            <Link to="/register" className="nav-btn primary-btn active">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="register-container">
        <div className="register-card">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'patient' ? 'active' : ''}`}
              onClick={() => handleTabChange('patient')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Patient Registration
            </button>
            <button
              className={`tab-btn ${activeTab === 'organization' ? 'active' : ''}`}
              onClick={() => handleTabChange('organization')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              Organization Registration
            </button>
          </div>

          {/* Registration Form */}
          <div className="form-container">
            <h2 className="form-title">
              {activeTab === 'patient' ? 'Patient Registration' : 'Organization Registration'}
            </h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {activeTab === 'patient' && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of Birth *</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="medicalConditions">Medical Conditions</label>
                    <textarea
                      id="medicalConditions"
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleChange}
                      placeholder="List any medical conditions or areas of interest for clinical trials"
                      rows={4}
                    />
                  </div>
                </>
              )}

              <div className="privacy-consent">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkmark"></span>
                  <span className="consent-text">
                    Privacy Consent * <br />
                    I agree to the processing of my personal health information in accordance with HIPAA regulations and the platform's privacy policy.
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : `Create ${activeTab === 'patient' ? 'Patient' : 'Organization'} Account`}
              </button>
            </form>

            <div className="login-link">
              Already have an account? <Link to="/login">Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;