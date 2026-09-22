import { AuthLoginSuccess, IAuthController } from "./domain";

export class AuthUseCase {
  constructor(private authApiController: IAuthController) {}
  async validSesionUser(token: string): Promise<boolean> {
    try {
      await this.authApiController.validSesionUser(token);
      return true;
    } catch (error) {
      console.error("Error en la validación");
    }
    return false;
  }
  async loginUser(email: string, password: string): Promise<AuthLoginSuccess> {
    return this.authApiController.loginUser(email, password);
  }

  async logoutUser(): Promise<boolean> {
    try {
      await this.authApiController.logoutUser();
      return true;
    } catch (error) {
      console.log("Error on:", error);
    }
    return false;
  }
}
