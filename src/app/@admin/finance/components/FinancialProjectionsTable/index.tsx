"use client";
import { flexRender } from "@tanstack/react-table";
import { DashboardCard } from "@/shared/components/DashboardCard";
import { FinancialProjectionsTableProps } from "../../interfaces";
import { FinancialTrendFilter } from "../../types";
import { useFinancialProyectionsTable } from "./hooks/useFinancialProyectionsTable";

const FinancialProjectionsTable = ({
  salesData,
  revenueData,
  filter,
  mode,
  onFilterChange,
  onModeChange,
}: FinancialProjectionsTableProps) => {
  const { handleModeChange, table, columns } = useFinancialProyectionsTable({
    filter,
    mode,
    onFilterChange,
    onModeChange,
    revenueData,
    salesData,
  });
  return (
    <DashboardCard
      title="Proyecciones financieras"
      description="Análisis de comportamiento y proyección por producto."
    >
      <div className="finance-table-toolbar">
        <div className="finance-tabs">
          <button
            type="button"
            className={mode === "SALES" ? "finance-tab-active" : "finance-tab"}
            onClick={() => handleModeChange("SALES")}
          >
            Proyección de ventas
          </button>

          <button
            type="button"
            className={
              mode === "REVENUE" ? "finance-tab-active" : "finance-tab"
            }
            onClick={() => handleModeChange("REVENUE")}
          >
            Proyección de ingresos
          </button>
        </div>

        <select
          aria-label="Filtrar tendencia"
          value={filter}
          onChange={(event) =>
            onFilterChange(event.target.value as FinancialTrendFilter)
          }
          className="finance-filter-select"
        >
          <option value="ALL">Todas las tendencias</option>
          <option value="INCREASE">A la alza</option>
          <option value="DECREASE">A la baja</option>
        </select>
      </div>

      <div className="finance-table-wrapper">
        <table className="finance-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="finance-empty-state">
                    No existen productos para esta tendencia.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default FinancialProjectionsTable;
