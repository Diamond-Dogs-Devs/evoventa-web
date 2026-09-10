import { ReactNode } from "react";
import { AuthGuard } from "@/shared/providers";

import "./global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
