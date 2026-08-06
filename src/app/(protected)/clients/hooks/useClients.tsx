import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FormikValues } from "formik";
import { useCustomSWR, fetcher, useCustomMutation } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { ToastContent } from "@/shared/ui";
import { usePagination } from "@/shared/utils";
import { ClientI } from "../types/client.types";

export const useClients = () => {
  const { open } = useToast();
  const { currentPage, pageSize, onPaginationChange } = usePagination();

  const clientsKey = `/clients?page=${currentPage}&limit=${pageSize}`;

  const { data, loading, error } = useCustomSWR<{
    data: ClientI[];
    meta: { lastPage: number };
  }>(clientsKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="Ha ocurrido un error cargando los clientes"
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
    url: "/clients",
    mutateKey: clientsKey,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="No se pudo actualizar el cliente"
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

  const cols = useMemo<ColumnDef<ClientI>[]>(
    () => [
      { header: "Nombre", accessorKey: "name" },
      { header: "Teléfono", accessorKey: "telephone" },
      { header: "Email", accessorKey: "email" },
      { header: "Dirección", accessorKey: "address" },
    ],
    [],
  );

  const handleCreateClient = (values: FormikValues) => {
    post({
      name: values.name,
      telephone: values.phone,
      email: values.email,
      address: values.address,
      rfc: values.rfc,
    });
  };

  const handleEditClient = (values: FormikValues) => {
    patch(`/clients/${values.id}`, {
      name: values.name,
      telephone: values.phone,
      email: values.email,
      address: values.address,
      rfc: values.rfc,
    });
  };

  const handleDeleteClient = (id: number) => {
    remove(`/clients/${id}`);
  };

  return {
    clients: data?.data ?? [],
    totalPages: data?.meta?.lastPage ?? 0,
    loading,
    error,
    cols,
    mutationLoading,
    handleCreateClient,
    handleEditClient,
    handleDeleteClient,
    currentPage,
    pageSize,
    onPaginationChange,
  };
};
