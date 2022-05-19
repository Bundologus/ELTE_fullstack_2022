export interface User {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export enum UserRole {
  Owner = 'OWNER',
  User = 'USER',
}
