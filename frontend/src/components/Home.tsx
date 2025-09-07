import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
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
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </div>

          <div className="nav-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="nav-btn signin-btn">Sign In</Link>
                <Link to="/register" className="nav-btn primary-btn">Get Started</Link>
              </>
            ) : (
              <div className="user-menu">
                <span className="user-greeting">Welcome, {user?.username}</span>
                {user?.role === 'admin' ? (
                  <Link to="/admin" className="nav-btn primary-btn">Dashboard</Link>
                ) : (
                  <Link to="/patient-portal" className="nav-btn primary-btn">Portal</Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Connecting Patients with{' '}
                <span className="highlight">Clinical Trials</span>
              </h1>
              <p className="hero-description">
                Bridge the gap between medical research and patient care. Find
                eligible participants for your studies or discover clinical trials that
                could change your life.
              </p>

              {!isAuthenticated ? (
                <div className="hero-actions">
                  <Link to="/register" className="cta-btn primary-cta">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    Join as Patient
                  </Link>
                  <Link to="/register" className="cta-btn secondary-cta">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                    Join as Organization
                  </Link>
                </div>
              ) : (
                <div className="hero-actions authenticated">
                  <h3 className="welcome-message">Ready to continue your journey?</h3>
                  {user?.role === 'admin' ? (
                    <Link to="/admin" className="cta-btn primary-cta">
                      Access Admin Dashboard
                    </Link>
                  ) : (
                    <Link to="/patient-portal" className="cta-btn primary-cta">
                      Go to Patient Portal
                    </Link>
                  )}
                </div>
              )}

              <div className="trust-indicators">
                <div className="trust-item">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4A2,2 0 0,0 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10A2,2 0 0,0 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z" />
                  </svg>
                  <span>Secure Platform</span>
                </div>
                <div className="trust-item">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
                  </svg>
                  <span>Privacy Protected</span>
                </div>
                <div className="trust-item">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
                  </svg>
                  <span>Trusted by Healthcare</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-container">
                <img
                  src="/clinical-trial.webp"
                  alt="Clinical Trial Research"
                  className="hero-image"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.classList.add('show-fallback');
                  }}
                />
                <div className="image-fallback">
                  <div className="medical-scene">
                    <div className="doctor-figure"></div>
                    <div className="patient-figure"></div>
                    <div className="medical-equipment"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How ClinicalConnect Works</h2>
            <p>Streamlined recruitment for better research outcomes</p>
          </div>

          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon discover">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <h3>Discover Trials</h3>
              <p>Search and filter clinical trials based on your condition, location, and eligibility criteria to find the perfect match.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon participants">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99l-2.98 3.67a.5.5 0 0 0 .39.84L15 13v5H9v-2c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v2H1v2h22v-2h-3z" />
                </svg>
              </div>
              <h3>Find Participants</h3>
              <p>Post your studies and connect with pre-screened, qualified participants who match your specific research criteria.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon connect">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4A2,2 0 0,0 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10A2,2 0 0,0 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z" />
                </svg>
              </div>
              <h3>Connect Safely</h3>
              <p>Secure, HIPAA-compliant communication between patients and research teams with full privacy protection.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;