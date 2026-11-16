import { useState } from "react";
import { mutate } from "swr";
import { ToastContent } from "@/shared/ui";
import { useCustomMutation } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { OrderI } from "../types/order.types";
import { getOrderStatusConfig } from "../utils";
import { useOrderDetails } from "./useOrderDetails";

export const useOrderDetailsModal = (order: OrderI, close: () => void) => {
  const status = getOrderStatusConfig(order.status);
  const createdAt = new Date(order.createdAt).toLocaleString("es-MX");
  const { items, loading, error } = useOrderDetails(order.id);
  const isQuotation = order.type === "QUOTATION";
  const canPrintReceipt = order.type === "ORDER";
  const [confirmingConversion, setConfirmingConversion] = useState(false);
  const { open: openToast } = useToast();

  const { patch, loading: converting } = useCustomMutation({
    url: "/orders",
    mutateKey: [],
    onSuccess: () => {
      mutate((key) => typeof key === "string" && key.startsWith("/orders"));
      openToast({
        type: "success",
        content: (
          <ToastContent
            title="Éxito"
            subtitle={`La cotización ${order.orderNumber} ahora es una venta`}
          />
        ),
      });
      close();
    },
    onError: () => {
      openToast({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="No se pudo convertir la cotización en venta"
          />
        ),
      });
    },
  });

  const handleConvertToSale = () =>
    patch(`/orders/type/${order.id}`, { type: "ORDER" }).catch(() => {
      
    });

  const receiptItems = items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: Number(item.price),
  }));

  return {
    status,
    createdAt,
    items,
    receiptItems,
    loading,
    error,
    isQuotation,
    canPrintReceipt,
    confirmingConversion,
    setConfirmingConversion,
    converting,
    handleConvertToSale,
  };
};
