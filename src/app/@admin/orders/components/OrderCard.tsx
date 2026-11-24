"use client";

import {
  UserIcon,
  UserGroupIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Heading } from "@/shared/ui";
import { OrderI } from "../types/order.types";
import { getOrderStatusConfig, QUOTATION_BADGE } from "../utils";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { formatDate, formatMoney } from "@/shared/utils/format";

interface OrderCardProps {
  order: OrderI;
  onClick?: (order: OrderI) => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const status = getOrderStatusConfig(order.status);
  const updatedAt = formatDate(order.updatedAt);

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(order)}
    >
      <div className="flex items-start justify-between gap-2">
        <Heading variant="titleCard" className="!border-0 !pb-0 !mb-0 !text-left min-w-0 break-all">
          {order.orderNumber}
        </Heading>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {order.type === "QUOTATION" && <StatusBadge {...QUOTATION_BADGE} />}
          <StatusBadge label={status.label} tone={status.tone} />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-sm !text-gray-600">
        <UserGroupIcon className="h-4 w-4 shrink-0 text-gray-400" />
        <Heading variant="body" className="!text-gray-600 truncate">
          <Heading variant="body" className="inline !text-gray-400">
            Cliente:
          </Heading>{" "}
          {order.clientName ?? "—"}
        </Heading>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <UserIcon className="h-4 w-4 shrink-0 text-gray-400" />
        <Heading variant="body" className="!text-gray-600 truncate">
          <Heading variant="body" className="inline !text-gray-400">
            Vendedor:
          </Heading>{" "}
          {order.userName ?? "—"}
        </Heading>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <ShoppingBagIcon className="h-4 w-4 shrink-0 text-gray-400" />
        <Heading variant="body" className="!text-gray-600">
          {order.totalItems}{" "}
          {order.totalItems === 1 ? "producto" : "productos"}
        </Heading>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
        <Heading variant="body" className="text-xs !text-gray-400">
          {updatedAt}
        </Heading>
        <Heading variant="body" className="font-bold text-base !text-gray-900">
          {formatMoney(order.totalAmount)}
        </Heading>
      </div>
    </div>
  );
}
