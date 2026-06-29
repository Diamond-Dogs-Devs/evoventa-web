"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;

  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  pageSizeOptions?: number[];
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
}: PaginationProps) {
  const showButtons = totalPages > 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const items: (number | "...")[] = [];

  pages.forEach((p) => {
    if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1) {
      items.push(p);
    } else if (items[items.length - 1] !== "...") {
      items.push("...");
    }
  });

  return (
    <div className="mt-auto pt-4 border-t border-gray-200">
      {showButtons && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="w-8 h-8 rounded-lg border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 text-gray-600" />
          </button>

          {items.map((item, index) =>
            item === "..." ? (
              <span key={index} className="px-1 text-gray-400">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item
                    ? "bg-background-secondary text-title-light border border-background-secondary"
                    : "border border-background-primary bg-background-primary text-title-primary hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="w-8 h-8 rounded-lg border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowRightIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}

      {onPageSizeChange && pageSizeOptions && (
        <div className="mt-4 flex justify-center">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-10 rounded-full border border-gray-300 bg-white pl-5 pr-10 text-gray-600 appearance-none hover:border-gray-400 focus:outline-none"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                Mostrar {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
