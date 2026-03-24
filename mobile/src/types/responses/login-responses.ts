import { User } from "../../models/user";

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