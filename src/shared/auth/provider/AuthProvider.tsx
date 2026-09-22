"use client";

import { use, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { useToast } from "../../overlay-manager";
import { ToastContent } from "../../ui";
import { useCustomMutation } from "../../api";

import { AuthContext } from "../context/auth.context";
import { LoginValues, User, AuthProviderProps } from "../types/auth.types";
import { AuthController } from "@/shared/services/auth/AuthController";

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { push, refresh } = useRouter();
  const { open } = useToast();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  });

  const login = async ({ email, password }: LoginValues) => {
    setIsLoading(true);
    try {
      const authController = new AuthController();
      const { token, user } = await authController.loginUser(email, password);
      setUser(user);
      //TODO: Delete localstorage for security
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      push("/");
      refresh();
    } catch (e) {
      open({
        type: "error",
        content: (
          <ToastContent title="Error" subtitle="Error al iniciar sesión" />
        ),
      });
    }
    setIsLoading(false);
  };

  const logout = async () => {
    const authController = new AuthController();
    const isOuted = await authController.logoutUser();
    if (isOuted) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      push("/");
      refresh();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
