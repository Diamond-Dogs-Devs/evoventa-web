/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import type { PaginationState } from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
  PencilSquareIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../spinner/spinner";
import Pagination from "../pagination/pagination";
import {
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  SortingState,
  ExpandedState,
  Row,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { removeFirstUrlSegment } from "../../../../../utils";
interface TableProps<T extends object> {
  data?: T[];
  columns: ColumnDef<T>[];
  showHeader?: boolean;
  path?: string | ((row: Row<T>) => string);
  columnVisibility?: Record<string, boolean>;
  loading?: boolean;
  withPagination?: boolean;
  currentPage?: number;
  currentLimit?: number;
  totalPages?: number;
  actions?: Array<string>;
  onPaginationChange?: (page: number, pageSize?: number) => void;
  rowClassName?: (row: Row<T>) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onLastMovements?: (row: T) => void;
}

const TableOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-75 z-50">
      <Spinner />
    </div>
  );
};

const PAGE_SIZE_OPTIONS = [15, 30, 50, 100, 200];

export function Table<T extends object>({
  data,
  columns,
  path = "",
  columnVisibility,
  showHeader = true,
  loading,
  withPagination,
  currentPage,
  currentLimit,
  totalPages,
  actions,
  onPaginationChange,
  rowClassName,
  onEdit,
  onDelete,
  onLastMovements,
}: TableProps<T>) {
  const pagination: PaginationState = {
    pageIndex: (currentPage ?? 1) - 1,
    pageSize: currentLimit ?? PAGE_SIZE_OPTIONS[0],
  };
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data: data ?? [],
    columns,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: totalPages,
    getSubRows: (row: any) => row?.subRows || [],
    onSortingChange: setSorting,
    getRowCanExpand: (row) => row?.subRows?.length > 0,
    state: {
      columnVisibility,
      pagination,
      sorting,
      expanded,
    },
  });

  const paginateArray = useCallback(
    ({ pageIndex }: { pageIndex: number }) => {
      const fillAmount = 5;

      if (isNaN(table.getPageCount())) return [];

      const total = table.getPageCount();
      const array = Array.from({ length: total }, (_, i) => i);

      if (pageIndex <= 2) {
        return array.slice(0, fillAmount);
      }

      if (pageIndex >= total - 3) {
        return array.slice(total - fillAmount, total);
      }

      return array.slice(pageIndex - 2, pageIndex + 3);
    },
    [table],
  );

  const handleClick = (row: Row<any>) => {
    if (path && path instanceof Function) {
      const route = path(row);
      if (route) {
        const redirectUrl = removeFirstUrlSegment(route);
        router.push(`/${redirectUrl}`);
      }
    } else if (path) {
      const redirectPath = removeFirstUrlSegment(path as string);
      router.push(`/${redirectPath}/${row.original.id}`);
    }
  };

  const handleAlternateClick = (row: Row<any>) => {
    if (path && path instanceof Function) {
      const route = path(row);
      route && window.open(`/${route}`);
    } else if (path) {
      window.open(`/${path}/${row.original.id}`);
    }
  };

  return (
    <div className="relative">
      {loading && <TableOverlay />}
      <table className="whitespace-nowrap table-auto min-w-full border-separate border-spacing-y-2">
        {showHeader && (
          <thead className="bg-white shadow-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-background-secondary">
                {table.getCanSomeRowsExpand() && <th scope="col" />}
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      scope="col"
                      className="p-4 text-sm font-semibold text-title-light text-center"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer group inline-flex select-none"
                              : "group inline-flex",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                                <ChevronUpIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ),
                            desc: (
                              <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                                <ChevronDownIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
                {actions ? (
                  <th className="p-4 text-sm font-semibold text-title-light text-center">
                    Acciones
                  </th>
                ) : null}
              </tr>
            ))}
          </thead>
        )}
        {data && (
          <tbody>
            {table.getRowModel().rows.map((row, idx: number) => {
              const trBgGroup =
                row.depth === 0 && !row.subRows?.length
                  ? "bg-white border-t-4"
                  : row.subRows?.length
                    ? "bg-light-gray-600"
                    : "bg-light-gray-200";

              const tdBgGroup =
                !row.depth && row.subRows?.length
                  ? "text-white"
                  : "text-black-200";

              const rowClassNames = classNames(
                trBgGroup,
                "shadow text-center border-t-4 border-ghost-blue-300 rounded-lg",
                rowClassName ? rowClassName(row) : "",
              );

              return (
                <tr key={idx} className={rowClassNames}>
                  {row.getCanExpand() && (
                    <td
                      className={`py-4 px-2 text-sm flex align-center first:rounded-t-lg first:rounded-b-lg ${tdBgGroup}`}
                    >
                      <div className="h-5 w-7" />
                      <button
                        type="button"
                        onClick={row.getToggleExpandedHandler()}
                      >
                        <i className="border w-full h-full border-1 rounded-full flex items-center justify-center ">
                          {row.getIsExpanded() ? (
                            <ChevronUpIcon width={20} className="p-1" />
                          ) : (
                            <ChevronDownIcon width={20} className="p-1" />
                          )}
                        </i>
                      </button>
                    </td>
                  )}
                  {row.getVisibleCells().map((cell, i) => {
                    return (
                      <td
                        key={cell.id}
                        onClick={() => {
                          const cells = row.getVisibleCells();
                          if (i !== cells?.length - 1) {
                            handleClick(row);
                          }
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault(); // Prevents the default context menu from appearing
                          const cells = row.getVisibleCells();
                          if (i !== cells?.length - 1) {
                            handleAlternateClick(row);
                          }
                        }}
                        className={`p-4 text-sm ${
                          typeof path === "string"
                            ? path
                              ? "cursor-pointer"
                              : ""
                            : path(row)
                              ? "cursor-pointer"
                              : ""
                        } ${tdBgGroup}`}
                      >
                        <div
                          className={
                            cell.column.id === "status" // <-- Verifica que sea la columna de status
                              ? row.original.status === "AVAILABLE"
                                ? "text-green-500 font-bold bg-green-100 rounded-full w-max px-2 py-1"
                                : row.original.status === "UNAVAILABLE"
                                  ? "text-red-500 font-bold"
                                  : "text-gray-500 font-bold"
                              : "" // <-- Deja las demás columnas sin estos colores
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </td>
                    );
                  })}
                  {actions ? (
                    <td className={`p-4 text-sm ${tdBgGroup}`}>
                      <div className="flex items-center justify-center gap-2">
                        {actions.includes("edit") && (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => onEdit?.(row.original)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <PencilSquareIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        )}
                        {actions.includes("delete") && (
                          <div className="flex items-center justify-center gap-2">
                            <hr className="border-l border-gray-300 h-6" />
                            <button
                              onClick={() => onDelete?.(row.original)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        )}
                        {actions.includes("lastMovements") && (
                          <div className="flex items-center justify-center gap-2">
                            <hr className="border-l border-gray-300 h-6" />
                            <button
                              onClick={() => onLastMovements?.(row.original)}
                              className="text-green-500 hover:text-green-700"
                            >
                              <ShoppingCartIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {withPagination && data && (
        <Pagination
          currentPage={currentPage ?? 1}
          totalPages={totalPages ?? 1}
          pageSize={currentLimit ?? PAGE_SIZE_OPTIONS[0]}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          onPageChange={(page) => {
            table.setPageIndex(page - 1);
            onPaginationChange?.(page);
          }}
          onPageSizeChange={(size) => {
            table.setPageIndex(0);
            table.setPageSize(size);
            onPaginationChange?.(1, size);
          }}
        />
      )}
    </div>
  );
}

export default Table;
