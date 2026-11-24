import { useState } from "react";
import { mutate } from "swr";
import { ToastContent } from "@/shared/ui";
import { useCustomMutation } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { formatDateTime } from "@/shared/utils/format";
import { OrderI, PendingActionT } from "../types/order.types";
import { EditableOrderStatusT, getOrderStatusConfig } from "../utils";
import { useOrderDetails } from "./useOrderDetails";

/** Revalidates every orders list (all pages and filters) and the detail. */
const revalidateOrders = () =>
  mutate((key) => typeof key === "string" && key.startsWith("/orders"));

export const useOrderDetailsModal = (order: OrderI, close: () => void) => {
  // Kept locally so the badge and buttons update without closing the modal.
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const status = getOrderStatusConfig(currentStatus);
  const createdAt = formatDateTime(order.createdAt);
  const { items, loading, error } = useOrderDetails(order.id);
  const isQuotation = order.type === "QUOTATION";
  const isCancelled = currentStatus === "CANCELLED";
  // Receipts are only for active sales; quotations aren't a sale yet.
  const canPrintReceipt = order.type === "ORDER" && !isCancelled;
  const [pendingAction, setPendingAction] = useState<PendingActionT | null>(
    null,
  );
  const [savingStatus, setSavingStatus] =
    useState<EditableOrderStatusT | null>(null);
  const { open: openToast } = useToast();

  // No callbacks: each action awaits the request and shows its own toast.
  // Orders aren't deleted from here: DELETE /orders/:id fails with a 500 on
  // quotations (OrderItem foreign key) and only sets isActive=false on sales,
  // which GET /orders still lists. Cancelling through the status covers both.
  const { patch, loading: mutating } = useCustomMutation({
    url: "/orders",
    mutateKey: [],
  });

  const showToast = (
    type: "success" | "error",
    title: string,
    subtitle: string,
  ) =>
    openToast({
      type,
      content: <ToastContent title={title} subtitle={subtitle} />,
    });

  const changeStatus = async (next: EditableOrderStatusT) => {
    if (next === currentStatus) return;
    setSavingStatus(next);
    try {
      await patch(`/orders/status/${order.id}`, { status: next });
      setCurrentStatus(next);
      setPendingAction(null);
      revalidateOrders();
      showToast(
        "success",
        "Estatus actualizado",
        `${order.orderNumber} ahora está ${getOrderStatusConfig(next).label.toLowerCase()}`,
      );
    } catch {
      showToast("error", "Error", "No se pudo cambiar el estatus de la orden");
    } finally {
      setSavingStatus(null);
    }
  };

  const handleStatusClick = (next: EditableOrderStatusT) => {
    if (next === "CANCELLED") {
      setPendingAction("cancel");
      return;
    }
    changeStatus(next);
  };

  const handleConvertToSale = async () => {
    try {
      await patch(`/orders/type/${order.id}`, { type: "ORDER" });
    } catch {
      showToast("error", "Error", "No se pudo convertir la cotización en venta");
      return;
    }
    revalidateOrders();
    showToast(
      "success",
      "Éxito",
      `La cotización ${order.orderNumber} ahora es una venta`,
    );
    close();
  };

  const confirmActions: Record<PendingActionT, () => void> = {
    convert: handleConvertToSale,
    cancel: () => changeStatus("CANCELLED"),
  };

  const receiptItems = items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: Number(item.price),
  }));

  return {
    currentStatus,
    status,
    createdAt,
    items,
    receiptItems,
    loading,
    error,
    isQuotation,
    canPrintReceipt,
    pendingAction,
    setPendingAction,
    savingStatus,
    mutating,
    handleStatusClick,
    confirmActions,
  };
};
