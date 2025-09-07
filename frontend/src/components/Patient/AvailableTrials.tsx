import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvailableTrials.css';

interface Trial {
  id: number;
  title: string;
  description: string;
  phase: string;
  condition: string;
  location: string;
  duration: string;
  requirements: string[];
  status: 'recruiting' | 'active' | 'completed';
  matchScore?: number;
}

const AvailableTrials: React.FC = () => {
  const navigate = useNavigate();
  const [trials, setTrials] = useState<Trial[]>([]);
  const [filteredTrials, setFilteredTrials] = useState<Trial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [appliedTrials, setAppliedTrials] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Mock data for three specific trials: General Disease, Hypertension, and Migraine
    const mockTrials: Trial[] = [
      {
        id: 1,
        title: 'General Disease Management Study',
        description: 'A comprehensive study evaluating new treatment approaches for general disease management and overall health improvement.',
        phase: 'Phase I',
        condition: 'General Disease',
        location: 'Multiple Centers',
        duration: '12 months',
        requirements: ['Age 18-65', 'General health conditions', 'Willing to participate'],
        status: 'recruiting',
        matchScore: 85
      },
      {
        id: 2,
        title: 'Hypertension Treatment Trial',
        description: 'Investigating the effectiveness of a new combination therapy for patients with high blood pressure.',
        phase: 'Phase II',
        condition: 'Hypertension',
        location: 'Regional Medical Center',
        duration: '6 months',
        requirements: ['Age 25-70', 'Systolic BP > 140mmHg', 'No recent heart surgery'],
        status: 'recruiting',
        matchScore: 72
      },
      {
        id: 3,
        title: 'Migraine Prevention and Treatment Study',
        description: 'Clinical trial evaluating innovative approaches to migraine prevention and acute treatment management.',
        phase: 'Phase III',
        condition: 'Migraine',
        location: 'Neurology Research Center',
        duration: '8 months',
        requirements: ['Age 18-60', 'Diagnosed with migraine', 'At least 4 episodes per month'],
        status: 'recruiting',
        matchScore: 78
      }
    ];

    setTrials(mockTrials);
    setFilteredTrials(mockTrials);
  }, []);

  useEffect(() => {
    let filtered = trials;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(trial =>
        trial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trial.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trial.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by condition
    if (selectedCondition !== 'all') {
      filtered = filtered.filter(trial =>
        trial.condition.toLowerCase() === selectedCondition.toLowerCase()
      );
    }

    // Filter by phase
    if (selectedPhase !== 'all') {
      filtered = filtered.filter(trial =>
        trial.phase.toLowerCase().includes(selectedPhase.toLowerCase())
      );
    }

    setFilteredTrials(filtered);
  }, [trials, searchTerm, selectedCondition, selectedPhase]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting':
        return '#27ae60';
      case 'active':
        return '#3498db';
      case 'completed':
        return '#95a5a6';
      default:
        return '#95a5a6';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase I':
        return '#e74c3c';
      case 'Phase II':
        return '#f39c12';
      case 'Phase III':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const conditions = ['all', 'General Disease', 'Hypertension', 'Migraine'];
  const phases = ['all', 'Phase I', 'Phase II', 'Phase III'];

  const handleApply = (trial: Trial) => {
    // Mark trial as applied
    setAppliedTrials(prev => new Set([...prev, trial.id]));

    // Navigate to patient form with trial information
    navigate('/patient-form', {
      state: {
        trialId: trial.id,
        trialTitle: trial.title,
        trialPhase: trial.phase,
        trialCondition: trial.condition,
        trialLocation: trial.location
      }
    });
  };

  return (
    <div className="available-trials">
      <div className="trials-header">
        <h1>Available Clinical Trials</h1>
        <p>Discover clinical trials that match your health profile</p>
      </div>

      <div className="trials-filters">
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Search trials by condition, title, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="filter-select"
          >
            {conditions.map(condition => (
              <option key={condition} value={condition}>
                {condition === 'all' ? 'All Conditions' : condition}
              </option>
            ))}
          </select>

          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="filter-select"
          >
            {phases.map(phase => (
              <option key={phase} value={phase}>
                {phase === 'all' ? 'All Phases' : phase}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="trials-stats">
        <div className="stat-item">
          <span className="stat-number">{filteredTrials.length}</span>
          <span className="stat-label">Available Trials</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredTrials.filter(t => t.status === 'recruiting').length}</span>
          <span className="stat-label">Currently Recruiting</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredTrials.filter(t => t.matchScore && t.matchScore > 70).length}</span>
          <span className="stat-label">High Match</span>
        </div>
      </div>

      <div className="trials-grid">
        {filteredTrials.map((trial) => (
          <div key={trial.id} className="trial-card">
            <div className="trial-header">
              <div className="trial-badges">
                <span 
                  className="phase-badge" 
                  style={{ backgroundColor: getPhaseColor(trial.phase) }}
                >
                  {trial.phase}
                </span>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(trial.status) }}
                >
                  {trial.status}
                </span>
                {trial.matchScore && (
                  <span className="match-badge">
                    {trial.matchScore}% Match
                  </span>
                )}
              </div>
            </div>

            <div className="trial-content">
              <h3 className="trial-title">{trial.title}</h3>
              <p className="trial-description">{trial.description}</p>

              <div className="trial-details">
                <div className="detail-item">
                  <svg className="detail-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22S19,14.25 19,9A7,7 0 0,0 12,2Z" />
                  </svg>
                  <span>{trial.location}</span>
                </div>
                <div className="detail-item">
                  <svg className="detail-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                  </svg>
                  <span>{trial.duration}</span>
                </div>
              </div>

              <div className="trial-requirements">
                <h4>Key Requirements:</h4>
                <ul>
                  {trial.requirements.slice(0, 3).map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="trial-actions">
              {appliedTrials.has(trial.id) ? (
                <button className="apply-btn applied" disabled>
                  Applied ✓
                </button>
              ) : (
                <button 
                  className="apply-btn primary"
                  onClick={() => handleApply(trial)}
                >
                  Apply Now
                </button>
              )}
              <button className="learn-more-btn">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTrials.length === 0 && (
        <div className="no-trials">
          <div className="no-trials-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <h3>No trials found</h3>
          <p>Try adjusting your search criteria or filters to find more trials.</p>
        </div>
      )}
    </div>
  );
};

export default AvailableTrials;