import React, { useState } from 'react';
import './CreateTrial.css';

interface TrialFormData {
  title: string;
  description: string;
  phase: string;
  condition: string;
  location: string;
  duration: string;
  participantsNeeded: number;
  eligibilityCriteria: string;
  exclusionCriteria: string;
  primaryEndpoint: string;
  secondaryEndpoints: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
}

const CreateTrial: React.FC = () => {
  const [formData, setFormData] = useState<TrialFormData>({
    title: '',
    description: '',
    phase: '',
    condition: '',
    location: '',
    duration: '',
    participantsNeeded: 0,
    eligibilityCriteria: '',
    exclusionCriteria: '',
    primaryEndpoint: '',
    secondaryEndpoints: '',
    contactEmail: '',
    contactPhone: '',
    status: 'recruiting'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participantsNeeded' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Clinical trial created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        phase: '',
        condition: '',
        location: '',
        duration: '',
        participantsNeeded: 0,
        eligibilityCriteria: '',
        exclusionCriteria: '',
        primaryEndpoint: '',
        secondaryEndpoints: '',
        contactEmail: '',
        contactPhone: '',
        status: 'recruiting'
      });
    } catch (error) {
      setError('Failed to create trial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-trial-container">
      <div className="create-trial-header">
        <h1>Create New Clinical Trial</h1>
        <p>Set up a new clinical trial and define eligibility criteria</p>
      </div>

      <div className="create-trial-card">
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="trial-form">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Trial Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter trial title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phase">Phase *</label>
                <select
                  id="phase"
                  name="phase"
                  value={formData.phase}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Phase</option>
                  <option value="Phase I">Phase I</option>
                  <option value="Phase II">Phase II</option>
                  <option value="Phase III">Phase III</option>
                  <option value="Phase IV">Phase IV</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the trial"
                rows={4}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="condition">Medical Condition *</label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  placeholder="e.g., General Disease, Diabetes, Cancer"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="recruiting">Recruiting</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location and Duration */}
          <div className="form-section">
            <h3>Location & Duration</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., New York, NY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration *</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 6 months, 1 year"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="participantsNeeded">Participants Needed *</label>
              <input
                type="number"
                id="participantsNeeded"
                name="participantsNeeded"
                value={formData.participantsNeeded}
                onChange={handleChange}
                placeholder="Number of participants"
                min="1"
                required
              />
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="form-section">
            <h3>Eligibility Criteria</h3>
            
            <div className="form-group">
              <label htmlFor="eligibilityCriteria">Inclusion Criteria *</label>
              <textarea
                id="eligibilityCriteria"
                name="eligibilityCriteria"
                value={formData.eligibilityCriteria}
                onChange={handleChange}
                placeholder="List the inclusion criteria for participants"
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exclusionCriteria">Exclusion Criteria</label>
              <textarea
                id="exclusionCriteria"
                name="exclusionCriteria"
                value={formData.exclusionCriteria}
                onChange={handleChange}
                placeholder="List the exclusion criteria for participants"
                rows={4}
              />
            </div>
          </div>

          {/* Study Endpoints */}
          <div className="form-section">
            <h3>Study Endpoints</h3>
            
            <div className="form-group">
              <label htmlFor="primaryEndpoint">Primary Endpoint *</label>
              <textarea
                id="primaryEndpoint"
                name="primaryEndpoint"
                value={formData.primaryEndpoint}
                onChange={handleChange}
                placeholder="Describe the primary endpoint of the study"
                rows={3}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondaryEndpoints">Secondary Endpoints</label>
              <textarea
                id="secondaryEndpoints"
                name="secondaryEndpoints"
                value={formData.secondaryEndpoints}
                onChange={handleChange}
                placeholder="Describe any secondary endpoints"
                rows={3}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h3>Contact Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Creating Trial...' : 'Create Trial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrial;