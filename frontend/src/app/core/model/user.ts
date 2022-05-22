export interface User {
  id?: number;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: UserRole;
  // TBD: authentication data
}

export enum UserRole {
  Owner = 'OWNER',
  User = 'USER',
}
