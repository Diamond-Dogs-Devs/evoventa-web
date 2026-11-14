"use client";

import { useModal } from "@/shared/providers";
import { useOrders } from "./hooks";
import { OrderDetailsModal, OrdersContainer } from "./components";
import { OrderI } from "./types/order.types";
import Page from "@/shared/components/Page";
import { ORDER_TYPE_FILTERS } from "./utils";

const appConfig = {
  title: "Órdenes",
  currentPath: "/orders",
};

export default function OrdersPage() {
  const { open, close } = useModal();
  const {
    orders,
    loading,
    currentPage,
    totalPages,
    pageSize,
    onPaginationChange,
    typeFilter,
    setTypeFilter,
  } = useOrders();

  const handleOpenDetails = (order: OrderI) => {
    open(<OrderDetailsModal order={order} close={close} />, {
      size: "medium",
      fullHeight: false,
    });
  };

  return (
    <Page title={appConfig.title}>
      <div
        role="tablist"
        aria-label="Filtrar por tipo"
        className="mb-4 inline-flex rounded-lg border border-gray-200 bg-white p-1"
      >
        {ORDER_TYPE_FILTERS.map((filter) => (
          <button
            key={filter.value || "all"}
            type="button"
            role="tab"
            aria-selected={typeFilter === filter.value}
            onClick={() => setTypeFilter(filter.value)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              typeFilter === filter.value
                ? "bg-background-secondary text-title-light"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <OrdersContainer
        orders={orders}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPaginationChange={onPaginationChange}
        onOrderClick={handleOpenDetails}
      />
    </Page>
  );
}
