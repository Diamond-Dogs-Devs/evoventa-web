import { FormikValues } from "formik";
import { useCustomSWR, fetcher, useCustomMutation } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { ToastContent } from "@/shared/ui";
import { usePagination } from "@/shared/utils";
import { UserI } from "../types/user.types";
import { USER_API_ERRORS } from "../utils/constants";

type ApiError = {
  response?: { status?: number; data?: string | { message?: string | string[] } };
};

const translateUserError = (msg: string) => {
  if (msg.includes("Unique constraint failed")) {
    return msg.includes("employeeNumber")
      ? USER_API_ERRORS["Employee number already exists"]
      : USER_API_ERRORS["User already exists"];
  }
  return USER_API_ERRORS[msg] ?? msg;
};

const getUserErrorMessage = (err: ApiError) => {
  const data = err?.response?.data;
  const raw = typeof data === "string" ? data : data?.message;
  const messages = (Array.isArray(raw) ? raw : raw ? [raw] : []).map(
    translateUserError,
  );
  return messages.length
    ? messages.join(". ")
    : "No se pudo guardar el usuario";
};

export const useUsers = () => {
  const { open } = useToast();
  const { currentPage, pageSize, onPaginationChange } = usePagination();

  const usersKey = `/users?page=${currentPage}&limit=${pageSize}`;

  const { data, loading, error } = useCustomSWR<{
    data: UserI[];
    meta: { lastPage: number };
  }>(usersKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="Ha ocurrido un error cargando los usuarios"
          />
        ),
      });
    },
  });

  const {
    post,
    patch,
    delete: remove,
    loading: mutationLoading,
  } = useCustomMutation({
    url: "/auth/register",
    mutateKey: usersKey,
    onError: (err) => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle={getUserErrorMessage(err as ApiError)}
          />
        ),
      });
    },
    onSuccess: () => {
      open({
        type: "success",
        content: (
          <ToastContent
            title="Éxito"
            subtitle="Operación realizada correctamente"
          />
        ),
      });
    },
  });

  // Returns the request so the modal can stay open if it fails.
  const handleCreateUser = (values: FormikValues) =>
    post({
      name: values.name.trim(),
      email: values.email.trim(),
      telephone: values.telephone.trim(),
      employeeNumber: values.employeeNumber.trim(),
      password: values.password,
      role: values.role,
    });

  const handleUpdateUser = (values: FormikValues) => {
    patch(`/users/${values.id}`, {
      name: values.name,
      email: values.email,
      telephone: values.telephone,
      employeeNumber: values.employeeNumber,
      // Always send the current role: the API defaults a missing role to USER.
      ...(values.role ? { role: values.role } : {}),
      ...(values.password ? { password: values.password } : {}),
    });
  };

  const handleDeleteUser = (id: number) => {
    remove(`/users/${id}`);
  };

  return {
    users: data?.data ?? [],
    totalPages: data?.meta?.lastPage ?? 0,
    loading,
    error,
    mutationLoading,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    currentPage,
    pageSize,
    onPaginationChange,
  };
};
