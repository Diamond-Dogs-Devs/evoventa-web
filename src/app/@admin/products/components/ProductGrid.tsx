"use client";

import React from "react";

interface ProductGridProps<T> {
  items: T[];
  loading: boolean;
  pageSize: number;
  emptyTitle: string;
  emptySubtitle: string;
  renderItem: (item: T) => React.ReactNode;
}

export function ProductGrid<T>({
  items,
  loading,
  pageSize,
  emptyTitle,
  emptySubtitle,
  renderItem,
}: ProductGridProps<T>) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: pageSize }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
          >
            <div className="w-32 h-32 bg-gray-200 rounded-xl mx-auto" />
            <div className="h-4 bg-gray-200 mt-3 rounded" />
            <div className="h-3 bg-gray-100 mt-2 w-2/3 rounded" />
            <div className="h-3 bg-gray-100 mt-1 w-1/2 rounded" />
            <div className="h-8 bg-gray-200 mt-4 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold">{emptyTitle}</p>
        <p className="text-sm text-gray-400 mt-1">{emptySubtitle}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map(renderItem)}
    </div>
  );
}
