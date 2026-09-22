import { useMemo } from "react";
import { useCustomSWR, fetcher } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { ToastContent } from "@/shared/ui";
import { usePagination } from "@/shared/utils";
import { OrderI, OrderUserI, OrderClientI } from "../types/order.types";

export const useOrders = () => {
  const { open } = useToast();
  const { currentPage, pageSize, onPaginationChange } = usePagination(10);

  const ordersKey = `/orders?page=${currentPage}&limit=${pageSize}`;

  const { data, loading, error } = useCustomSWR<{
    data: OrderI[];
    meta: { lastPage: number };
  }>(ordersKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="Ha ocurrido un error cargando las órdenes"
          />
        ),
      });
    },
  });

  const { data: usersData } = useCustomSWR<{ data: OrderUserI[] }>(
    "/users?limit=100",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const { data: clientsData } = useCustomSWR<{ data: OrderClientI[] }>(
    "/clients?page=1&limit=100",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const userMap = useMemo<Record<string, string>>(() => {
    const users: OrderUserI[] = usersData?.data ?? [];
    return Object.fromEntries(users.map((user) => [user.id, user.name]));
  }, [usersData]);

  const clientMap = useMemo<Record<string, string>>(() => {
    const clients: OrderClientI[] = clientsData?.data ?? [];
    return Object.fromEntries(clients.map((client) => [client.id, client.name]));
  }, [clientsData]);

  const orders: OrderI[] = useMemo(() => {
    const raw: OrderI[] = data?.data ?? [];
    return raw.map((order) => ({
      ...order,
      userName: userMap[order.userId] ?? order.userId,
      clientName: clientMap[order.clientId] ?? order.clientId,
    }));
  }, [data, userMap, clientMap]);

  return {
    orders,
    totalPages: data?.meta?.lastPage ?? 0,
    loading,
    error,
    currentPage,
    pageSize,
    onPaginationChange,
  };
};
