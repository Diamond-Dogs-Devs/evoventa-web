import { AuthProvider, ModalProvider, SWRProvider } from "@/shared/providers";
import { Layout } from "@/shared/ui/src/lib/layout/layout";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SWRProvider>
      <ModalProvider>
        <AuthProvider>
          <Layout>
            <main className="app">{children}</main>
          </Layout>
        </AuthProvider>
      </ModalProvider>
    </SWRProvider>
  );
}
