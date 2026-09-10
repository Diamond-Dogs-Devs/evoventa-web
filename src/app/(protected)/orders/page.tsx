"use client";

import { Layout } from "@/shared/ui";
import { useModal } from "@/shared/providers";
import { useOrders } from "./hooks";
import { OrderDetailsModal, OrdersContainer } from "./components";
import { OrderI } from "./types/order.types";

const appConfig = {
  title: "Órdenes",
  currentPath: "/orders",
};

export default function OrdersPage() {
  const { open, close } = useModal();
  const { orders, loading, currentPage, totalPages, pageSize, onPaginationChange } =
    useOrders();

  const handleOpenDetails = (order: OrderI) => {
    open(<OrderDetailsModal order={order} close={close} />, {
      size: "medium",
      fullHeight: false,
    });
  };

  return (
    <Layout appConfig={appConfig}>
      <OrdersContainer
        orders={orders}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPaginationChange={onPaginationChange}
        onOrderClick={handleOpenDetails}
      />
    </Layout>
  );
}
