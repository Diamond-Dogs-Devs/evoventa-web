import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import { cookies } from "next/headers";
import { AuthController } from "@/shared/services/auth/AuthController";
import { PWARegister } from "@/shared/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evoventa",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  appleWebApp: {
    capable: true,
    title: "Evoventa",
    statusBarStyle: "black",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
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
    <>
      <PWARegister />
      {isLoggin ? admin : anonym}
    </>
  );
}
