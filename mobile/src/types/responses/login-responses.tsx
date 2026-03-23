export interface User {
  id: number;
  username: string;
  email: string;
  age: number;
  role: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
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