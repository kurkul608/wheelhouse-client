export type UserRole = "USER" | "ADMIN" | "MANAGER" | "SUPER_ADMIN";

export interface User {
  id: string;
  tgId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  languageCode?: string;
  roles: UserRole[];
}
