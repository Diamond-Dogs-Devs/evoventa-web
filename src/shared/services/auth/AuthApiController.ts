import { URL_AUTH } from "@/shared/urls";
import axios from "axios";
import { AuthLoginSuccess, AuthRequest, IAuthController } from "./domain";

export class AuthApiController implements IAuthController {
  async validSesionUser(token: string): Promise<AuthRequest> {
    const { data } = await axios.post<AuthRequest>(
      `${URL_AUTH}/verifyToken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  async loginUser(email: string, password: string): Promise<AuthLoginSuccess> {
    const credetials = {
      email,
      password,
    };
    const { data } = await axios.post<AuthLoginSuccess>(
      `${URL_AUTH}/login`,
      credetials,
      {
        withCredentials: true,
      }
    );
    return data;
  }

  async logoutUser(): Promise<void> {
    await axios.post<AuthLoginSuccess>(
      `${URL_AUTH}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
