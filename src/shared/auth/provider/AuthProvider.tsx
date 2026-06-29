"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { useToast } from "../../overlay-manager";
import { ToastContent } from "../../ui";
import { useCustomMutation } from "../../api";

import { AuthContext } from "../context/auth.context";
import {
  LoginResponse,
  LoginValues,
  User,
  ApiError,
  AuthProviderProps,
} from "../types/auth.types";

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
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

  const { post: mutateLogin, loading: mutationLoading } = useCustomMutation<
    LoginResponse,
    AxiosError<ApiError>
  >({
    url: "/auth/login",

    onError: (error) => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle={
              error.response?.data?.message || "Error al iniciar sesión"
            }
          />
        ),
      });
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      router.replace("/products");
    },
  });

  const login = (values: LoginValues) => mutateLogin(values);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        mutationLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
