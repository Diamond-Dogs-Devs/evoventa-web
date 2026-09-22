interface OrdersSkeletonProps {
  /** Número de tarjetas placeholder a mostrar. */
  count?: number;
}

export function OrdersSkeleton({ count = 10 }: OrdersSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 p-4 h-40 animate-pulse"
        />
      ))}
    </div>
  );
}
