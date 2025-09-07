import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TrialApplication {
  id: string;
  trialName: string;
  trialId: string;
  appliedDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  phase: string;
  condition: string;
  location: string;
}

interface Activity {
  id: string;
  type: 'application' | 'status_update' | 'match' | 'profile' | 'assessment';
  title: string;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'new' | 'approved' | 'rejected';
  trialId?: string;
  trialName?: string;
}

interface TrialContextType {
  applications: TrialApplication[];
  activities: Activity[];
  addApplication: (application: Omit<TrialApplication, 'id' | 'appliedDate'>) => void;
  updateApplicationStatus: (applicationId: string, status: TrialApplication['status']) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'date'>) => void;
  getRecentActivities: (limit?: number) => Activity[];
  getApplicationsCount: () => number;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

export const useTrials = () => {
  const context = useContext(TrialContext);
  if (!context) {
    throw new Error('useTrials must be used within a TrialProvider');
  }
  return context;
};

interface TrialProviderProps {
  children: ReactNode;
}

export const TrialProvider: React.FC<TrialProviderProps> = ({ children }) => {
  const [applications, setApplications] = useState<TrialApplication[]>([
    {
      id: '1',
      trialName: 'General Disease Trial',
      trialId: 'GDT-2024-001',
      appliedDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'pending',
      phase: 'Phase II',
      condition: 'General Disease',
      location: 'New York, NY'
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'application',
      title: 'Applied to General Disease Trial',
      description: 'Successfully submitted application for Phase II General Disease Trial',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'pending',
      trialId: 'GDT-2024-001',
      trialName: 'General Disease Trial'
    },
    {
      id: '2',
      type: 'match',
      title: 'New trial matches found',
      description: '3 new clinical trials match your profile criteria',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: 'new'
    },
    {
      id: '3',
      type: 'profile',
      title: 'Profile information updated',
      description: 'Medical history and contact information updated successfully',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'completed'
    },
    {
      id: '4',
      type: 'assessment',
      title: 'Medical assessment completed',
      description: 'Completed comprehensive medical assessment form',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: 'completed'
    }
  ]);

  const addApplication = (applicationData: Omit<TrialApplication, 'id' | 'appliedDate'>) => {
    const newApplication: TrialApplication = {
      ...applicationData,
      id: Date.now().toString(),
      appliedDate: new Date()
    };

    setApplications(prev => [newApplication, ...prev]);

    // Add corresponding activity
    addActivity({
      type: 'application',
      title: `Applied to ${applicationData.trialName}`,
      description: `Successfully submitted application for ${applicationData.phase} ${applicationData.trialName}`,
      status: 'pending',
      trialId: applicationData.trialId,
      trialName: applicationData.trialName
    });
  };

  const updateApplicationStatus = (applicationId: string, status: TrialApplication['status']) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status } : app
      )
    );

    // Find the application to get details for activity
    const application = applications.find(app => app.id === applicationId);
    if (application) {
      const statusMessages = {
        approved: 'Application approved',
        rejected: 'Application rejected',
        under_review: 'Application under review',
        pending: 'Application pending'
      };

      addActivity({
        type: 'status_update',
        title: `${application.trialName} - ${statusMessages[status]}`,
        description: `Your application for ${application.trialName} status has been updated to ${status}`,
        status: status === 'approved' ? 'completed' : status === 'rejected' ? 'rejected' : 'pending',
        trialId: application.trialId,
        trialName: application.trialName
      });
    }
  };

  const addActivity = (activityData: Omit<Activity, 'id' | 'date'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString(),
      date: new Date()
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  const getRecentActivities = (limit: number = 5) => {
    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  };

  const getApplicationsCount = () => {
    return applications.length;
  };

  const value: TrialContextType = {
    applications,
    activities,
    addApplication,
    updateApplicationStatus,
    addActivity,
    getRecentActivities,
    getApplicationsCount
  };

  return (
    <TrialContext.Provider value={value}>
      {children}
    </TrialContext.Provider>
  );
};