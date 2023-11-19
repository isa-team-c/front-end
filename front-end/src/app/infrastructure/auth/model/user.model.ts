export interface User {
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
  isVerified: boolean;
}

export enum UserRole {
  ROLE_REGULAR = 'ROLE_REGULAR',
  ROLE_COMPANY_ADMIN = 'ROLE_COMPANY_ADMIN',
  ROLE_SYSTEM_ADMIN = 'ROLE_SYSTEM_ADMIN',
}
