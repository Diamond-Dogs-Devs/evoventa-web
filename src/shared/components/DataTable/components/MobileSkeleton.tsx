function MobileSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="px-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      ))}
    </>
  );
}

export default MobileSkeleton;
