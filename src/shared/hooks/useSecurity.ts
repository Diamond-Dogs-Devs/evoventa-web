"use client";
import { useEffect, useState } from "react";

export const useSecurity = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedToken = window.localStorage.getItem("token");

    setToken(storedToken);
  }, []);

  return {
    token,
  };
};
