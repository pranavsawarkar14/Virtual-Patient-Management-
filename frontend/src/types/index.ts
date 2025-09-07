export interface User {
  id: number;
  username: string;
  email?: string;
  role: 'admin' | 'patient';
}

export interface PatientForm {
  id?: number;
  user_id?: number;
  Age: number | string;
  Sex: number;
  Weight_kg: number | string;
  Height_cm: number | string;
  BMI: number | string;
  Cohort: number | string;
  ALT: number | string;
  Creatinine: number | string;
  SBP: number | string;
  DBP: number | string;
  HR: number | string;
  Temp_C: number | string;
  AdverseEvent: number;
  eligibility?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  role: 'admin' | 'patient';
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  redirect?: string;
}