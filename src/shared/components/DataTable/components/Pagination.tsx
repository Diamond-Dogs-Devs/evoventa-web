function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  loading,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}) {
  if (total === 0) {
    return null;
  }
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div className=" flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ">
      <span className="text-xs text-slate-500">
        Mostrando <span className="font-medium text-slate-700">{start}</span>a{" "}
        <span className="font-medium text-slate-700"> {end} </span> de
        <span className="font-medium text-slate-700"> {total} </span>
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page === 1 || loading}
          onClick={() => onPageChange(page - 1)}
          className=" flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 "
        >
          ‹
        </button>
        <div className=" flex h-9 min-w-9 items-center justify-center rounded-lg bg-slate-900 px-3 text-sm font-medium text-white ">
          {page}
        </div>
        <button
          type="button"
          disabled={page >= totalPages || loading}
          onClick={() => onPageChange(page + 1)}
          className=" flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 "
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Pagination;
