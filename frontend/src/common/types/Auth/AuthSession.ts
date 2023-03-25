import { User } from "@/common/types/User/User";

export interface AuthSession {
  access: string;
  refresh: string;
  exp: number;
  access_token_expiration: string;
  user: User;
  role: string;
}
