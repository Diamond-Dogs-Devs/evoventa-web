import { Heading } from "@/shared/ui";

interface OrdersEmptyStateProps {
  /** Mensaje a mostrar cuando no hay órdenes. */
  message?: string;
}

export function OrdersEmptyState({
  message = "No hay órdenes agregadas",
}: OrdersEmptyStateProps) {
  return (
    <div className="flex flex-1 justify-center items-center">
      <Heading variant="sectionHeadingCard">{message}</Heading>
    </div>
  );
}
