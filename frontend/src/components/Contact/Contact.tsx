import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'patient'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        userType: 'patient'
      });
    }, 1000);
  };

  return (
    <div className="contact-page">
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
            <Link to="/contact" className="nav-link active">Contact Us</Link>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="nav-btn signin-btn">Sign In</Link>
            <Link to="/register" className="nav-btn primary-btn">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contact Our Team</h1>
            <p className="hero-subtitle">
              Have questions about clinical trials or our platform? We're here to help 
              patients, researchers, and healthcare organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll respond within 24 hours.</p>
              
              {submitMessage && (
                <div className="success-message">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="userType">I am a *</label>
                    <select
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      required
                    >
                      <option value="patient">Patient</option>
                      <option value="researcher">Researcher</option>
                      <option value="healthcare-org">Healthcare Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe how we can help you..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                  </div>
                  <div className="method-content">
                    <h3>Phone Support</h3>
                    <p>+1 (555) 123-4567</p>
                    <span>Mon-Fri, 9AM-6PM EST</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                    </svg>
                  </div>
                  <div className="method-content">
                    <h3>Email Support</h3>
                    <p>support@trialmatch.com</p>
                    <span>Response within 24 hours</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <div className="method-content">
                    <h3>Office Location</h3>
                    <p>123 Medical Center Drive<br />Boston, MA 02115</p>
                    <span>By appointment only</span>
                  </div>
                </div>
              </div>

              <div className="emergency-info">
                <h3>Medical Emergency?</h3>
                <p>
                  If you're experiencing a medical emergency, please call 911 
                  or go to your nearest emergency room immediately. This platform 
                  is not for emergency medical situations.
                </p>
              </div>

              <div className="support-hours">
                <h3>Support Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I find clinical trials?</h3>
              <p>
                Register as a patient and complete your medical profile. Our AI 
                matching system will identify relevant trials based on your condition, 
                location, and eligibility criteria.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is my medical information secure?</h3>
              <p>
                Yes, we use enterprise-grade security and are fully HIPAA compliant. 
                Your medical information is encrypted and only shared with your 
                explicit consent.
              </p>
            </div>
            <div className="faq-item">
              <h3>How much does it cost to use Trial Match?</h3>
              <p>
                Trial Match is completely free for patients. We're funded by 
                research institutions and pharmaceutical companies who pay to 
                access our recruitment platform.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I withdraw from a trial?</h3>
              <p>
                Absolutely. Participation in clinical trials is always voluntary, 
                and you can withdraw at any time without penalty or loss of 
                benefits to which you're entitled.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;