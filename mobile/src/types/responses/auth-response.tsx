import { UserResponse } from "./user-response";

export interface AuthResponse {
  status: boolean;
  data: UserResponse;
}
