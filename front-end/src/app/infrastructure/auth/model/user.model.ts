import { Role } from "./role.model";

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  phoneNumber: string;
  profession: string;
  companyInformation: string;
  confirmationPassword: string;
  role: Role;
  isVerified: boolean;
}