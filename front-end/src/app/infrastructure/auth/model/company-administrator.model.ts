import { User2 } from './user2.model';
import { Company } from './company.model';

export interface CompanyAdministrator {
  id: number;
  user: User2;
}