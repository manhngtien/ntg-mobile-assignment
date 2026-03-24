import { User } from "../../models/user";

export interface AuthResponse {
  status: boolean;
  data: User;
}
