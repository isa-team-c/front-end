import { Company } from "./company.model";
import { User } from "./user.model";

export interface Complaint {
    userDto: User;
    companyDto: Company;
    complaintContent: string;
    responded: boolean;
  }