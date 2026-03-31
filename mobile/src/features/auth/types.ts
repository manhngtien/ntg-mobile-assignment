import { User } from '../../models/user';

export interface AuthResponse {
  status: boolean;
  data: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: {
    message: string;
  };
}
