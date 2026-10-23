import { ReactNode } from "react";

import { cookies } from "next/headers";
import { AuthController } from "@/shared/services/auth/AuthController";
import { PWARegister } from "@/shared/providers";
import "./globals.css";

export const metadata = {
  manifest: "/manifest.webmanifest",
};

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
  return (
    <html lang="es">
      <body>
        <PWARegister />
        {isLoggin ? admin : anonym}
      </body>
    </html>
  );
}
