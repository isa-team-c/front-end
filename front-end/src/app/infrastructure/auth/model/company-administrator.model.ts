import { User2, UserRole } from './user2.model';
import { Company } from './company.model';

export interface CompanyAdministrator {
  id: number;
  user: User2;
}