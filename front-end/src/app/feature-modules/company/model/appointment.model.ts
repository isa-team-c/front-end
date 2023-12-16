import { CompanyAdministrator } from "src/app/infrastructure/auth/model/company-administrator.model";

export interface Appointment {
    id: number;
    companyAdministrator?: CompanyAdministrator| null;
    startDate: Date;
    duration: number;
    isFree: boolean;
    isSelected: boolean;
  }