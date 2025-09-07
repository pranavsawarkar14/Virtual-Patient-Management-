import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { PatientForm } from '../../types';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [patients, setPatients] = useState<PatientForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkingEligibility, setCheckingEligibility] = useState<number | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await adminAPI.getPatients();
      setPatients(data);
    } catch (error) {
      setError('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckEligibility = async (patientId: number) => {
    setCheckingEligibility(patientId);
    try {
      const result = await adminAPI.checkEligibility(patientId);
      // Update the patient in the list with the new eligibility status
      setPatients(prev => 
        prev.map(patient => 
          patient.id === patientId 
            ? { ...patient, eligibility: result.result }
            : patient
        )
      );
    } catch (error) {
      setError('Failed to check eligibility');
    } finally {
      setCheckingEligibility(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Manage patient applications and check eligibility</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="patients-table-container">
        {patients.length === 0 ? (
          <div className="no-patients">No patient applications found.</div>
        ) : (
          <table className="patients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Weight (kg)</th>
                <th>Height (cm)</th>
                <th>BMI</th>
                <th>Cohort</th>
                <th>ALT</th>
                <th>Creatinine</th>
                <th>SBP</th>
                <th>DBP</th>
                <th>HR</th>
                <th>Temp (°C)</th>
                <th>Adverse Event</th>
                <th>Eligibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.Age}</td>
                  <td>{patient.Sex === 1 ? 'Male' : 'Female'}</td>
                  <td>{patient.Weight_kg}</td>
                  <td>{patient.Height_cm}</td>
                  <td>{patient.BMI}</td>
                  <td>{patient.Cohort}</td>
                  <td>{patient.ALT}</td>
                  <td>{patient.Creatinine}</td>
                  <td>{patient.SBP}</td>
                  <td>{patient.DBP}</td>
                  <td>{patient.HR}</td>
                  <td>{patient.Temp_C}</td>
                  <td>{patient.AdverseEvent === 1 ? 'Yes' : 'No'}</td>
                  <td>
                    <span className={`eligibility-status ${patient.eligibility?.toLowerCase()}`}>
                      {patient.eligibility || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCheckEligibility(patient.id!)}
                      disabled={checkingEligibility === patient.id}
                      className="check-eligibility-btn"
                    >
                      {checkingEligibility === patient.id ? 'Checking...' : 'Check Eligibility'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;