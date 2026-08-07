"use client";

import {
  UserGroupIcon,
  UserIcon,
  CalendarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Button, Heading } from "@/shared/ui";
import { useOrderDetails } from "../hooks";
import { OrderI } from "../types/order.types";

interface OrderDetailsModalProps {
  order: OrderI;
  close: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 !text-yellow-700",
  COMPLETED: "bg-green-100 !text-green-700",
  CANCELLED: "bg-red-100 !text-red-600",
};

export function OrderDetailsModal({ order, close }: OrderDetailsModalProps) {
  const statusColor = STATUS_COLORS[order.status] ?? "bg-gray-100 !text-gray-600";
  const createdAt = new Date(order.createdAt).toLocaleString("es-MX");
  const { items, loading } = useOrderDetails(order.id);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-2">
        <Heading variant="sectionHeadingCard" className="!py-0 !border-0">
          {order.orderNumber}
        </Heading>
        <Heading
          variant="body"
          className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${statusColor}`}
        >
          {order.status}
        </Heading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <UserGroupIcon className="h-5 w-5 text-gray-400 shrink-0" />
          <div>
            <Heading variant="body" className="text-xs !text-gray-400">
              Cliente
            </Heading>
            <Heading variant="body" className="font-medium !text-gray-700">
              {order.clientName ?? "—"}
            </Heading>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <UserIcon className="h-5 w-5 text-gray-400 shrink-0" />
          <div>
            <Heading variant="body" className="text-xs !text-gray-400">
              Vendedor
            </Heading>
            <Heading variant="body" className="font-medium !text-gray-700">
              {order.userName ?? "—"}
            </Heading>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarIcon className="h-5 w-5 text-gray-400 shrink-0" />
          <div>
            <Heading variant="body" className="text-xs !text-gray-400">
              Creada
            </Heading>
            <Heading variant="body" className="font-medium !text-gray-700">
              {createdAt}
            </Heading>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShoppingBagIcon className="h-4 w-4 shrink-0" />
          <Heading variant="body" className="font-medium !text-gray-500">
            Productos
          </Heading>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <Heading variant="body" className="text-sm !text-gray-400">
            No se encontraron productos para esta orden.
          </Heading>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            {items.map((item, i) => (
              <div
                key={`${item.productId}-${i}`}
                className="flex items-center justify-between py-2"
              >
                <div className="min-w-0">
                  <Heading
                    variant="body"
                    className="text-sm font-medium !text-gray-800 truncate"
                  >
                    {item.name}
                  </Heading>
                  <Heading variant="body" className="text-xs !text-gray-400">
                    {item.quantity} × ${Number(item.price).toFixed(2)}
                  </Heading>
                </div>
                <Heading
                  variant="body"
                  className="text-sm font-semibold !text-gray-800 shrink-0"
                >
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </Heading>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Heading variant="body" className="text-sm !text-gray-500">
          Total
        </Heading>
        <Heading variant="body" className="text-2xl font-bold !text-gray-900">
          ${Number(order.totalAmount).toFixed(2)}
        </Heading>
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="fill" color="primary" onClick={close}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}
