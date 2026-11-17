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

type PageItem = number | "gap-left" | "gap-right";

/**
 * Page numbers to render: always first and last, plus the current page and
 * its neighbours, with a gap marker where pages are skipped. Each gap has its
 * own string id so React keys never collide with page numbers (using the
 * array index as key for "…" clashed with pages 2, 4, … and made React reuse
 * the wrong buttons when changing pages).
 */
export function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  const items: PageItem[] = [1];

  if (start > 2) items.push("gap-left");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push("gap-right");

  items.push(totalPages);
  return items;
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
  const page = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const items = getPageItems(page, totalPages);

  const navButtonClass =
    "w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors";

  return (
    <div className="mt-auto pt-4 border-t border-gray-200">
      {showButtons && (
        <nav
          aria-label="Paginación"
          className="flex flex-wrap items-center justify-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={navButtonClass}
            aria-label="Página anterior"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          {items.map((item) =>
            typeof item === "string" ? (
              <span
                key={item}
                className="w-9 h-9 flex items-center justify-center text-gray-400 select-none"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={`page-${item}`}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={page === item ? "page" : undefined}
                aria-label={`Página ${item}`}
                className={`min-w-9 h-9 px-2 rounded-lg text-sm font-medium tabular-nums transition-colors ${
                  page === item
                    ? "bg-background-secondary text-title-light border border-background-secondary"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={navButtonClass}
            aria-label="Página siguiente"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </nav>
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
