import { CompanyAdministrator } from "src/app/infrastructure/auth/model/company-administrator.model";

export interface Appointment {
    id: number;
    companyAdministrator: CompanyAdministrator;
    startDate: Date;
    duration: number;
    isFree: boolean;
  }