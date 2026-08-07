"use client";

import { Layout, Heading, Pagination } from "@/shared/ui";
import { useModal } from "@/shared/providers";
import { useOrders } from "./hooks";
import { OrderCard, OrderDetailsModal } from "./components";
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
      <div className="flex flex-col gap-4 min-h-[calc(100vh-10rem)]">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-4 h-40 animate-pulse"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-1 justify-center items-center">
            <Heading variant="sectionHeadingCard">
              No hay órdenes agregadas
            </Heading>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onClick={handleOpenDetails} />
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
    </Layout>
  );
}
