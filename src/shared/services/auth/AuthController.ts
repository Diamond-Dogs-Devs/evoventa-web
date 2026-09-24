import { AuthApiController } from "./AuthApiController";
import { AuthUseCase } from "./AuthUseCase";
import { AuthLoginSuccess, AuthRequest, IAuthController } from "./domain";

export class AuthController {
  protected authUsecase: AuthUseCase;
  constructor() {
    const apiController = new AuthApiController();
    this.authUsecase = new AuthUseCase(apiController);
  }

  async validSesionUser(token: string): Promise<boolean> {
    return this.authUsecase.validSesionUser(token);
  }

  async loginUser(email: string, password: string): Promise<AuthLoginSuccess> {
    return this.authUsecase.loginUser(email, password);
  }

  async logoutUser(): Promise<boolean> {
    return this.authUsecase.logoutUser();
  }

  async loginWithNextApi(
    email: string,
    password: string
  ): Promise<AuthLoginSuccess> {
    return this.authUsecase.loginWithNextApi(email, password);
  }
}
