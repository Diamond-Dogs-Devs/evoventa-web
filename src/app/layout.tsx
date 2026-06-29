import { ReactNode } from "react";
import { SWRProvider, ModalProvider, AuthProvider } from "@/shared/providers";

import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SWRProvider>
          <AuthProvider>
            <ModalProvider>{children}</ModalProvider>
          </AuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
