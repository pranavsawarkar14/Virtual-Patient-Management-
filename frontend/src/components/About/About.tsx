import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
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
            <Link to="/about" className="nav-link active">About</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="nav-btn signin-btn">Sign In</Link>
            <Link to="/register" className="nav-btn primary-btn">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Trial Match</h1>
            <p className="hero-subtitle">
              Revolutionizing clinical trial recruitment through advanced technology 
              and compassionate patient care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Trial Match, we believe that every patient deserves access to cutting-edge 
                medical treatments and every researcher deserves to find the right participants 
                for their groundbreaking studies. Our mission is to bridge this gap through 
                innovative technology and personalized matching.
              </p>
              <p>
                We're committed to accelerating medical breakthroughs by connecting patients 
                with clinical trials that could change their lives, while helping researchers 
                find qualified participants more efficiently than ever before.
              </p>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
              </div>
              <h3>Trust & Security</h3>
              <p>
                We maintain the highest standards of data security and privacy protection, 
                ensuring patient information is always safe and secure.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>
                We leverage cutting-edge AI and machine learning technologies to create 
                more accurate and efficient patient-trial matching.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3>Compassion</h3>
              <p>
                Every interaction is guided by empathy and understanding, recognizing 
                the human element in medical research and patient care.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
              </div>
              <h3>Global Impact</h3>
              <p>
                We're committed to making clinical trials accessible worldwide, 
                breaking down barriers to medical advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Our Expertise</h2>
          <p className="team-intro">
            Our multidisciplinary team combines decades of experience in healthcare, 
            technology, and clinical research to deliver exceptional results.
          </p>
          
          <div className="expertise-areas">
            <div className="expertise-card">
              <h3>Clinical Research</h3>
              <p>Deep understanding of clinical trial processes, regulatory requirements, and patient safety protocols.</p>
            </div>
            <div className="expertise-card">
              <h3>AI & Machine Learning</h3>
              <p>Advanced algorithms for patient matching, predictive analytics, and automated screening processes.</p>
            </div>
            <div className="expertise-card">
              <h3>Healthcare Technology</h3>
              <p>HIPAA-compliant systems, secure data management, and user-friendly healthcare interfaces.</p>
            </div>
            <div className="expertise-card">
              <h3>Patient Advocacy</h3>
              <p>Commitment to patient rights, informed consent, and ethical research practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Clinical Research?</h2>
            <p>Join thousands of patients and researchers who trust Trial Match for their clinical trial needs.</p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-btn primary">Get Started Today</Link>
              <Link to="/contact" className="cta-btn secondary">Contact Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;