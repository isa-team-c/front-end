import { CompanyAdministrator } from "./company-administrator.model";

export interface Appointment {
    id: number;
    companyAdministrator: CompanyAdministrator;
    startDate: Date;
    duration: number;
    isFree: Boolean;
}