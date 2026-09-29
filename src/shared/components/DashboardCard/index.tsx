import { DashboardCardProps } from "./type";
export const DashboardCard = ({
  title,
  description,
  children,
  actions,
  className = "",
}: DashboardCardProps) => {
  return (
    <section
      className={` w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${className} `}
    >
      {(title || description || actions) && (
        <header className=" flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between ">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-slate-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-500"> {description} </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2"> {actions} </div>
          )}
        </header>
      )}
      <div className="p-6"> {children} </div>
    </section>
  );
};
