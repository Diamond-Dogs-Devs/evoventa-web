import { useCustomSWR, fetcher } from "@/shared/api";
import { OrderDetailI } from "../types/order.types";

export const useOrderDetails = (orderId: string | null) => {
  const { data, loading, error } = useCustomSWR<OrderDetailI>(
    orderId ? `/orders/id/${orderId}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  return {
    items: data?.OrderItem ?? [],
    loading,
    error,
  };
};
