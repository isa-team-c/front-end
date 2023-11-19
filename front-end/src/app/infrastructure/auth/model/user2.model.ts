export interface User2 {
    city: string;
    companyInformation: string;
    country: string;
    email: string;
    id: number;
    name: string;
    password: string;
    phoneNumber: string;
    profession: string;
    role: UserRole;
    surname: string;
  }
  
  export enum UserRole {
    ROLE_REGULAR = 'ROLE_REGULAR',
    ROLE_COMPANY_ADMIN = 'ROLE_COMPANY_ADMIN',
    ROLE_SYSTEM_ADMIN = 'ROLE_SYSTEM_ADMIN',
  }
  