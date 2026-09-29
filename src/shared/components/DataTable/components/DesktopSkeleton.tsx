function DesktopSkeleton({ columns, rows }: { columns: number; rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <tr key={row} className="border-b border-slate-100">
          {Array.from({ length: columns }).map((_, column) => (
            <td key={column} className="px-6 py-5">
              <div className=" h-4 w-3/4 animate-pulse rounded-md bg-slate-200 " />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default DesktopSkeleton;
