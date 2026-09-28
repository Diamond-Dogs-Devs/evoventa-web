import { useCallback, useEffect, useState } from "react";
import DesktopSkeleton from "./components/DesktopSkeleton";
import MobileSkeleton from "./components/MobileSkeleton";
import Pagination from "./components/Pagination";
import { ResponsiveDataTableProps } from "./type";

export function DataTable<T>({
  columns,
  data: externalData,
  onLoad,
  pageSize = 10,
  emptyMessage = "No hay información disponible.",
  skeletonRows = 5,
  className = "",
  getRowId,
  renderActions,
}: ResponsiveDataTableProps<T>) {
  const [data, setData] = useState<T[]>(externalData || []);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const initializeData = useCallback(() => {
    if (externalData) {
      setData(externalData);
    }
  }, [externalData]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);
  console.log("data:", data);
  console.log("externalData:", externalData);
  const loadData = useCallback(async () => {
    try {
      if (onLoad) {
        setLoading(true);
        setError(null);
        const response = await onLoad(page, pageSize);
        if (!response || !Array.isArray(response.data)) {
          throw new Error(
            "La respuesta de onLoad no tiene el formato esperado."
          );
        }
        setData(response.data);
        setTotal(Number(response.total) || 0);
        setExpandedRows(new Set());
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible cargar la información."
      );
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [onLoad, page, pageSize]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  const getId = (item: T, index: number) => {
    return getRowId?.(item, index) ?? String(index);
  };
  const toggleRow = (id: string) => {
    setExpandedRows((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }
    setPage(nextPage);
  };
  return (
    <div
      className={` w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md ${className} `}
    >
      <div className="hidden lg:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className=" px-6 py-4 text-left align-middle "
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-800">
                        {column.title}
                      </span>
                      {column.subtitle && (
                        <span className="mt-1 text-xs font-normal text-slate-500">
                          {column.subtitle}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {renderActions && <th className="px-6 py-4" />}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <DesktopSkeleton
                  columns={columns.length + (renderActions ? 1 : 0)}
                  rows={skeletonRows}
                />
              ) : error ? (
                <tr>
                  <td
                    colSpan={columns.length + (renderActions ? 1 : 0)}
                    className="px-6 py-12 text-center"
                  >
                    <span className="text-sm text-red-500"> {error} </span>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (renderActions ? 1 : 0)}
                    className="px-6 py-12 text-center"
                  >
                    <span className="text-sm text-slate-500">
                      {emptyMessage}
                    </span>
                  </td>
                </tr>
              ) : (
                data.map((item, rowIndex) => (
                  <tr
                    key={getId(item, rowIndex)}
                    className=" border-b border-slate-100 last:border-0 hover:bg-slate-50 "
                  >
                    {columns.map((column) => (
                      <td key={column.key} className=" px-6 py-4 align-middle ">
                        {column.render(item, rowIndex)}
                      </td>
                    ))}
                    {renderActions && (
                      <td className="px-6 py-4 text-right">
                        {renderActions(item, rowIndex)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="block lg:hidden">
        {loading ? (
          <MobileSkeleton rows={skeletonRows} />
        ) : error ? (
          <div className="px-5 py-12 text-center">
            <span className="text-sm text-red-500"> {error} </span>
          </div>
        ) : data.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <span className="text-sm text-slate-500">{emptyMessage}</span>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.map((item, rowIndex) => {
              const id = getId(item, rowIndex);
              const expanded = expandedRows.has(id);
              const primary = columns[0];
              const secondary = columns.slice(1);
              return (
                <div key={id}>
                  <button
                    type="button"
                    onClick={() => toggleRow(id)}
                    className=" flex w-full items-center justify-between gap-4 px-5 py-4 text-left "
                  >
                    <div className="min-w-0">
                      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        {primary.title}
                      </div>
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {primary.render(item, rowIndex)}
                      </div>
                    </div>
                    <span
                      className={` flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform ${
                        expanded ? "rotate-180" : ""
                      } `}
                    >
                      ↓
                    </span>
                  </button>
                  {expanded && (
                    <div className="border-t border-slate-100 bg-slate-50 p-5">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {secondary
                          .filter((column) => !column.hideOnMobile)
                          .map((column) => (
                            <div
                              key={column.key}
                              className=" rounded-xl border border-slate-200 bg-white p-4 "
                            >
                              <div className="text-xs font-medium text-slate-400">
                                {column.title}
                              </div>
                              {column.subtitle && (
                                <div className="mt-1 text-xs text-slate-400">
                                  {column.subtitle}
                                </div>
                              )}
                              <div className="mt-2 text-sm font-medium text-slate-800">
                                {column.render(item, rowIndex)}
                              </div>
                            </div>
                          ))}
                      </div>
                      {renderActions && (
                        <div className="mt-4 border-t border-slate-200 pt-4">
                          {renderActions(item, rowIndex)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!loading && total > 0 && (
        <Pagination
          loading={loading}
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}

export default DataTable;
