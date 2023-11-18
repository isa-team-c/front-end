export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    city: string;
    country: string;
    phoneNumber: string;
    profession: string;
    companyInformation: string;
    role: UserRole; 
  }
  
export enum UserRole {
    ROLE_REGULAR = 'ROLE_REGULAR',
    ROLE_COMPANY_ADMIN = 'ROLE_COMPANY_ADMIN',
    ROLE_SYSTEM_ADMIN = 'ROLE_SYSTEM_ADMIN',
}
  