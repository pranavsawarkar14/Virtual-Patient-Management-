import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { patientAPI } from '../../services/api';
import { useTrials } from '../../context/TrialContext';
import { PatientForm as PatientFormType } from '../../types';
import './PatientForm.css';

const PatientForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addApplication } = useTrials();
  const trialInfo = location.state as { 
    trialId?: number; 
    trialTitle?: string; 
    trialPhase?: string;
    trialCondition?: string;
    trialLocation?: string;
  } | null;
  
  const [formData, setFormData] = useState<PatientFormType>({
    Age: '',
    Sex: 0,
    Weight_kg: '',
    Height_cm: '',
    BMI: '',
    Cohort: '',
    ALT: '',
    Creatinine: '',
    SBP: '',
    DBP: '',
    HR: '',
    Temp_C: '',
    AdverseEvent: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const handleModalClose = () => {
    setShowSuccessModal(false);
    if (trialInfo) {
      navigate('/patient-portal/dashboard');
    } else {
      navigate('/patient-portal');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Convert string values to numbers for API submission
    const submissionData = {
      ...formData,
      Age: typeof formData.Age === 'string' ? parseFloat(formData.Age) || 0 : formData.Age,
      Weight_kg: typeof formData.Weight_kg === 'string' ? parseFloat(formData.Weight_kg) || 0 : formData.Weight_kg,
      Height_cm: typeof formData.Height_cm === 'string' ? parseFloat(formData.Height_cm) || 0 : formData.Height_cm,
      BMI: typeof formData.BMI === 'string' ? parseFloat(formData.BMI) || 0 : formData.BMI,
      Cohort: typeof formData.Cohort === 'string' ? parseFloat(formData.Cohort) || 0 : formData.Cohort,
      ALT: typeof formData.ALT === 'string' ? parseFloat(formData.ALT) || 0 : formData.ALT,
      Creatinine: typeof formData.Creatinine === 'string' ? parseFloat(formData.Creatinine) || 0 : formData.Creatinine,
      SBP: typeof formData.SBP === 'string' ? parseFloat(formData.SBP) || 0 : formData.SBP,
      DBP: typeof formData.DBP === 'string' ? parseFloat(formData.DBP) || 0 : formData.DBP,
      HR: typeof formData.HR === 'string' ? parseFloat(formData.HR) || 0 : formData.HR,
      Temp_C: typeof formData.Temp_C === 'string' ? parseFloat(formData.Temp_C) || 0 : formData.Temp_C,
    };

    try {
      const response = await patientAPI.submitForm(submissionData);
      if (response.success) {
        if (trialInfo) {
          // Add application to context
          addApplication({
            trialName: trialInfo.trialTitle || 'Clinical Trial',
            trialId: `TRL-${trialInfo.trialId}-${Date.now()}`,
            status: 'pending',
            phase: trialInfo.trialPhase || 'Unknown Phase',
            condition: trialInfo.trialCondition || 'General',
            location: trialInfo.trialLocation || 'Unknown Location'
          });
        }
        
        setMessage('Form submitted successfully!');
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          Age: '',
          Sex: 0,
          Weight_kg: '',
          Height_cm: '',
          BMI: '',
          Cohort: '',
          ALT: '',
          Creatinine: '',
          SBP: '',
          DBP: '',
          HR: '',
          Temp_C: '',
          AdverseEvent: 0,
        });
      } else {
        setError(response.message || 'Submission failed');
      }
    } catch (error) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Handle empty values
    if (value === '') {
      setFormData({
        ...formData,
        [name]: '',
      });
      return;
    }
    
    // For select fields (Sex, AdverseEvent), handle directly
    if (name === 'Sex' || name === 'AdverseEvent') {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
      return;
    }
    
    // Parse numeric value
    const numericValue = parseFloat(value);
    
    // If the value is not a valid number, show validation error
    if (isNaN(numericValue)) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: 'Please enter a valid number'
      }));
      return;
    }
    
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };

  // Auto-calculate BMI when weight or height changes
  React.useEffect(() => {
    const weight = typeof formData.Weight_kg === 'number' ? formData.Weight_kg : 0;
    const height = typeof formData.Height_cm === 'number' ? formData.Height_cm : 0;
    
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      setFormData(prev => ({ ...prev, BMI: Math.round(bmi * 100) / 100 }));
    } else if (formData.Weight_kg === '' || formData.Height_cm === '') {
      setFormData(prev => ({ ...prev, BMI: '' }));
    }
  }, [formData.Weight_kg, formData.Height_cm]);

  return (
    <div className="patient-form-container">
      <div className="patient-form-card">
        <h2>Patient Information Form</h2>
        <p>Please fill out this form with your medical information. All fields are required for processing.</p>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Age">Age:</label>
              <input
                type="number"
                id="Age"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                placeholder="Enter your age"
                required
                min="0"
                max="120"
                className={validationErrors.Age ? 'error' : ''}
              />
              <small className="field-hint">Age in years (0-120)</small>
              {validationErrors.Age && <span className="validation-error">{validationErrors.Age}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="Sex">Sex:</label>
              <select
                id="Sex"
                name="Sex"
                value={formData.Sex}
                onChange={handleChange}
                required
              >
                <option value={0}>Female</option>
                <option value={1}>Male</option>
              </select>
              <small className="field-hint">Select your biological sex</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Weight_kg">Weight (kg):</label>
              <input
                type="number"
                id="Weight_kg"
                name="Weight_kg"
                value={formData.Weight_kg}
                onChange={handleChange}
                placeholder="Enter weight in kg"
                required
                min="0"
                step="0.1"
                className={validationErrors.Weight_kg ? 'error' : ''}
              />
              <small className="field-hint">Weight in kilograms (e.g., 70.5)</small>
              {validationErrors.Weight_kg && <span className="validation-error">{validationErrors.Weight_kg}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="Height_cm">Height (cm):</label>
              <input
                type="number"
                id="Height_cm"
                name="Height_cm"
                value={formData.Height_cm}
                onChange={handleChange}
                placeholder="Enter height in cm"
                required
                min="0"
                step="0.1"
                className={validationErrors.Height_cm ? 'error' : ''}
              />
              <small className="field-hint">Height in centimeters (e.g., 175.5)</small>
              {validationErrors.Height_cm && <span className="validation-error">{validationErrors.Height_cm}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="BMI">BMI (calculated):</label>
              <input
                type="number"
                id="BMI"
                name="BMI"
                value={formData.BMI}
                readOnly
                step="0.01"
                placeholder="Auto-calculated"
              />
              <small className="field-hint">Automatically calculated from weight and height</small>
            </div>
            <div className="form-group">
              <label htmlFor="Cohort">Cohort:</label>
              <input
                type="number"
                id="Cohort"
                name="Cohort"
                value={formData.Cohort}
                onChange={handleChange}
                placeholder="Enter cohort number"
                required
                min="0"
                className={validationErrors.Cohort ? 'error' : ''}
              />
              <small className="field-hint">Study group number (typically 1-10)</small>
              {validationErrors.Cohort && <span className="validation-error">{validationErrors.Cohort}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ALT">ALT (Alanine Transaminase):</label>
              <input
                type="number"
                id="ALT"
                name="ALT"
                value={formData.ALT}
                onChange={handleChange}
                placeholder="Enter ALT level"
                required
                min="0"
                step="0.1"
                className={validationErrors.ALT ? 'error' : ''}
              />
              <small className="field-hint">Liver enzyme level in U/L (normal: 7-56)</small>
              {validationErrors.ALT && <span className="validation-error">{validationErrors.ALT}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="Creatinine">Creatinine:</label>
              <input
                type="number"
                id="Creatinine"
                name="Creatinine"
                value={formData.Creatinine}
                onChange={handleChange}
                placeholder="Enter creatinine level"
                required
                min="0"
                step="0.01"
                className={validationErrors.Creatinine ? 'error' : ''}
              />
              <small className="field-hint">Kidney function marker in mg/dL (normal: 0.6-1.2)</small>
              {validationErrors.Creatinine && <span className="validation-error">{validationErrors.Creatinine}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="SBP">Systolic Blood Pressure:</label>
              <input
                type="number"
                id="SBP"
                name="SBP"
                value={formData.SBP}
                onChange={handleChange}
                placeholder="Enter systolic BP"
                required
                min="0"
                className={validationErrors.SBP ? 'error' : ''}
              />
              <small className="field-hint">Upper number in mmHg (normal: 90-120)</small>
              {validationErrors.SBP && <span className="validation-error">{validationErrors.SBP}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="DBP">Diastolic Blood Pressure:</label>
              <input
                type="number"
                id="DBP"
                name="DBP"
                value={formData.DBP}
                onChange={handleChange}
                placeholder="Enter diastolic BP"
                required
                min="0"
                className={validationErrors.DBP ? 'error' : ''}
              />
              <small className="field-hint">Lower number in mmHg (normal: 60-80)</small>
              {validationErrors.DBP && <span className="validation-error">{validationErrors.DBP}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="HR">Heart Rate:</label>
              <input
                type="number"
                id="HR"
                name="HR"
                value={formData.HR}
                onChange={handleChange}
                placeholder="Enter heart rate"
                required
                min="0"
                className={validationErrors.HR ? 'error' : ''}
              />
              <small className="field-hint">Beats per minute (normal: 60-100)</small>
              {validationErrors.HR && <span className="validation-error">{validationErrors.HR}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="Temp_C">Body Temperature (°C):</label>
              <input
                type="number"
                id="Temp_C"
                name="Temp_C"
                value={formData.Temp_C}
                onChange={handleChange}
                placeholder="Enter temperature"
                required
                min="0"
                step="0.1"
                className={validationErrors.Temp_C ? 'error' : ''}
              />
              <small className="field-hint">Body temperature in Celsius (normal: 36.1-37.2)</small>
              {validationErrors.Temp_C && <span className="validation-error">{validationErrors.Temp_C}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="AdverseEvent">Adverse Event History:</label>
              <select
                id="AdverseEvent"
                name="AdverseEvent"
                value={formData.AdverseEvent}
                onChange={handleChange}
                required
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <small className="field-hint">Have you experienced any adverse events in previous treatments?</small>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : 'Submit Form'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#27ae60"/>
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Form Submitted Successfully!</h3>
              <p>Your patient information has been submitted successfully and is being reviewed for eligibility.</p>
              <button className="modal-button" onClick={handleModalClose}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientForm;