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

export abstract class MockUsers {
  public static users: User[] = [
    {
      firstName: 'Süsü',
      email: 'susu@hetedhet.hu',
      role: UserRole.Owner,
    },
    {
      firstName: 'Leonidász',
      email: 'this_is@sparta.gr',
      role: UserRole.Owner,
    },
    {
      firstName: 'Elek',
      email: 'elek@teszt.hu',
      role: UserRole.User,
    },
  ];
}
