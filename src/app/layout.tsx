import { ReactNode } from "react";
import { SWRProvider, ModalProvider, AuthProvider } from "@/shared/providers";

import "./globals.css";
import { cookies } from "next/headers";
import { AuthController } from "@/shared/services/auth/AuthController";

export default async function RootLayout({
  anonym,
  admin,
}: {
  anonym: ReactNode;
  admin: ReactNode;
}) {
  const checkUser = async () => {
    const cookie = await cookies();
    const token = cookie.get("access_token")?.value;
    if (!token) return false;
    const authController = new AuthController();
    const isLogin = await authController.validSesionUser(token);
    return isLogin;
  };

  const isLoggin = await checkUser();
  console.log("isLoggin:", isLoggin);
  return (
    <html lang="es">
      <body>{isLoggin ? admin : anonym}</body>
    </html>
  );
}
