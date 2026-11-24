"use client";

import { useModal } from "@/shared/providers";
import { useOrders } from "./hooks";
import { OrderDetailsModal, OrdersContainer } from "./components";
import { OrderI } from "./types/order.types";
import Page from "@/shared/components/Page";
import { SearchInput } from "@/shared/components/SearchInput";
import { ORDER_STATUS_FILTERS, ORDER_TYPE_FILTERS } from "./utils";

const appConfig = {
  title: "Órdenes",
  currentPath: "/orders",
};

interface FilterTabsProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

function FilterTabs<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex flex-wrap rounded-lg border border-gray-200 bg-white p-1"
    >
      {options.map((option) => (
        <button
          key={option.value || "all"}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            value === option.value
              ? "bg-background-secondary text-title-light"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

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
    statusFilter,
    setStatusFilter,
    search,
    onSearchChange,
    activeSearch,
  } = useOrders();

  const handleOpenDetails = (order: OrderI) => {
    open(<OrderDetailsModal order={order} close={close} />, {
      size: "medium",
      fullHeight: false,
    });
  };

  return (
    <Page title={appConfig.title}>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Buscar por número de orden"
        />
        <FilterTabs
          label="Filtrar por tipo"
          options={ORDER_TYPE_FILTERS}
          value={typeFilter}
          onChange={setTypeFilter}
        />
        <FilterTabs
          label="Filtrar por estatus"
          options={ORDER_STATUS_FILTERS}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <OrdersContainer
        orders={orders}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPaginationChange={onPaginationChange}
        onOrderClick={handleOpenDetails}
        emptyMessage={
          activeSearch ? `Sin resultados para "${activeSearch}"` : undefined
        }
      />
    </Page>
  );
}
