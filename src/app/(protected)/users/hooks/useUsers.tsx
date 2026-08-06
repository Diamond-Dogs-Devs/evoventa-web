import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FormikValues } from "formik";
import { useCustomSWR, fetcher, useCustomMutation } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { ToastContent } from "@/shared/ui";
import { usePagination } from "@/shared/utils";
import { UserI } from "../types/user.types";

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
    url: "/users",
    mutateKey: usersKey,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="No se pudo actualizar el usuario"
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

  const cols = useMemo<ColumnDef<UserI>[]>(
    () => [
      { header: "Nombre", accessorKey: "name" },
      { header: "Teléfono", accessorKey: "telephone" },
      { header: "Email", accessorKey: "email" },
      { header: "Número de empleado", accessorKey: "employeeNumber" },
    ],
    [],
  );

  const handleCreateUser = (values: FormikValues) => {
    post({
      name: values.name,
      email: values.email,
      telephone: values.telephone,
      employeeNumber: values.employeeNumber,
      password: values.password,
    });
  };

  const handleUpdateUser = (values: FormikValues) => {
    patch(`/users/${values.id}`, {
      name: values.name,
      email: values.email,
      telephone: values.telephone,
      employeeNumber: values.employeeNumber,
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
    cols,
    mutationLoading,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    currentPage,
    pageSize,
    onPaginationChange,
  };
};
