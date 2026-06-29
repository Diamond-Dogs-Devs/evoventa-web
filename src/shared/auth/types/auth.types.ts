export type Role = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  role?: string;
  mutationLoading: boolean;
  login: (values: LoginValues) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
