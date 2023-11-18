import { User } from "src/app/infrastructure/auth/model/user.model";

export interface Profile {
  id: number;
  user: User;
  penalties: number;
}