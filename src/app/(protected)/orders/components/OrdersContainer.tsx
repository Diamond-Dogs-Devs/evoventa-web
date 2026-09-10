import { Pagination } from "@/shared/ui";
import { OrderI } from "../types/order.types";
import { OrderCard } from "./OrderCard";
import { OrdersSkeleton } from "./OrdersSkeleton";
import { OrdersEmptyState } from "./OrdersEmptyState";

interface OrdersContainerProps {
  orders: OrderI[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPaginationChange: (page: number, size?: number) => void;
  onOrderClick?: (order: OrderI) => void;
}

export function OrdersContainer({
  orders,
  loading,
  currentPage,
  totalPages,
  pageSize,
  onPaginationChange,
  onOrderClick,
}: OrdersContainerProps) {
  return (
    <div className="flex flex-col gap-4 min-h-[calc(100vh-10rem)]">
      {loading ? (
        <OrdersSkeleton count={pageSize} />
      ) : orders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onClick={onOrderClick} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={(page) => onPaginationChange(page, pageSize)}
        onPageSizeChange={(size) => onPaginationChange(1, size)}
        pageSizeOptions={[10, 20, 50]}
      />
    </div>
  );
}
