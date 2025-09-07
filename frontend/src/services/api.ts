import axios from 'axios';
import { LoginCredentials, RegisterData, PatientForm, AuthResponse, User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/logout');
  },

  checkSession: async (): Promise<{ authenticated: boolean; user?: User }> => {
    const response = await api.get('/check_session');
    return response.data;
  }
};

export const patientAPI = {
  submitForm: async (formData: PatientForm): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/patient_form', formData);
    return response.data;
  }
};

export const adminAPI = {
  getPatients: async (): Promise<PatientForm[]> => {
    const response = await api.get('/admin_dashboard');
    return response.data.patients || [];
  },

  checkEligibility: async (patientId: number): Promise<{ patient: PatientForm; result: string }> => {
    const response = await api.get(`/check/${patientId}`);
    return {
      patient: response.data.patient,
      result: response.data.result
    };
  }
};

export default api;