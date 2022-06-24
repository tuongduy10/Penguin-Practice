import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { Division } from '../models/division.model';
import { UserProfile } from './profile.response';

export interface UserInfo{
  bscAccount: boolean,
  countryCode: string[],
  divisions: Division[],
  enabled: number,
  isAdmin: boolean,
  permissions: Permission[],
  role: Role,
  roleTypes: any[],
  userId: number,
  userProfile: UserProfile,
  username: string,
}
