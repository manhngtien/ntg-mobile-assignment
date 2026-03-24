import { UserResponse } from "./user-response";

export interface LoginResponse {
  status: boolean;
  data?: {
    user: UserResponse;
    token: string;
  };
  error?: {
    message: string;
  };
}