"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
    }
  }, [router]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) return null;

  return <>{children}</>;
}
