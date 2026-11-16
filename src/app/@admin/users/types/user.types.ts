import type { FormikValues } from "formik";

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

export interface UserCardProps {
  user: UserI;
  onEdit: (user: UserI) => void;
  onDelete: (user: UserI) => void;
}

export type UserFormMode = "create" | "edit";

export interface UserFormProps {
  mode: UserFormMode;
  initialValues?: FormikValues;
  onSubmit: (values: FormikValues) => void | Promise<unknown>;
  close: () => void;
}
