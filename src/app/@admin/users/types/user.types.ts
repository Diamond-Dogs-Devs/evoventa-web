export type UserRole = "ADMIN" | "USER";

export interface UserI {
  id: number;
  name: string;
  email: string;
  telephone: string;
  employeeNumber: string;
  role?: UserRole;
  isActive?: boolean;
  createdAt?: string;
}
