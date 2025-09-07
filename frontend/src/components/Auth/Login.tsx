import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { LoginCredentials } from '../../types';
import './Login.css';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [accountType, setAccountType] = useState<'patient' | 'admin'>('patient');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(credentials);
      if (response.success && response.user) {
        login(response.user);
        navigate(response.user.role === 'admin' ? '/admin' : '/patient-portal');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p className="login-subtitle">Sign in to your Clinical Trial account</p>
          <p className="account-type-instruction">Please select your account type below</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Account Type Selection */}
          <div className="account-type-section">
            <h3>Account Type</h3>
            <div className="account-type-options">
              <div 
                className={`account-type-card ${accountType === 'patient' ? 'selected' : ''}`}
                onClick={() => setAccountType('patient')}
              >
                <div className="account-icon patient-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h4>Patient</h4>
                <p>Find and join trials</p>
              </div>

              <div 
                className={`account-type-card ${accountType === 'admin' ? 'selected' : ''}`}
                onClick={() => setAccountType('admin')}
              >
                <div className="account-icon organization-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <h4>Organization</h4>
                <p>Manage clinical trials</p>
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="username">Email Address</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Signing in...' : `Sign In as ${accountType === 'patient' ? 'Patient' : 'Organization'}`}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="signup-link">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;