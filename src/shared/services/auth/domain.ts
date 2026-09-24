import { AxiosResponse } from "axios";

type AuthRequestError = {
  message: string;
  error: string;
  statusCode: number;
};

type AuthRequestSuccess = {
  id: string;
  employeeNumber: string;
  email: string;
  name: string;
  telephone: string;
  role: string;
  imageUrl: string | null;
  imagePublicId: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
};

export type AuthLoginSuccess = {
  user: AuthRequestSuccess;
  token: string;
};

export type AuthRequest = AuthRequestSuccess | AuthRequestError;

export interface IAuthController {
  validSesionUser(token: string): Promise<AuthRequest>;
  loginUser(email: string, password: string): Promise<AuthLoginSuccess>;
  logoutUser(): Promise<void>;
  loginWithNextApi(email: string, password: string): Promise<AuthLoginSuccess>;
}
