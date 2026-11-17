import { useMemo } from "react";
import { FinancialProyectionsTableProps } from "./types";
import {
  ProductHealth,
  ProductProjection,
  TrendType,
} from "@/shared/services/finance/domain";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { currencyFormatter, numberFormatter } from "@/shared/utils/numbers";
import { FinancialProjectionMode } from "../../../types";

export const useFinancialProyectionsTable = ({
  mode,
  revenueData,
  salesData,
  filter,
  onFilterChange,
  onModeChange,
}: FinancialProyectionsTableProps) => {
  const sourceData = mode === "SALES" ? salesData : revenueData;

  const filteredData = useMemo(() => {
    return sourceData.filter((product) => {
      if (filter === "INCREASE") {
        return product.trendType === TrendType.INCREASE;
      }

      if (filter === "DECREASE") {
        return product.trendType === TrendType.DECREASE;
      }

      return true;
    });
  }, [sourceData, filter]);

  const columns = useMemo<ColumnDef<ProductProjection>[]>(
    () => [
      {
        accessorKey: "productName",
        header: "Producto",
      },
      {
        accessorKey: "currentSales",
        header: "Ventas actuales",
        cell: ({ getValue }) => numberFormatter.format(Number(getValue())),
      },
      {
        accessorKey: "trendPercentage",
        header: "Tendencia",
        cell: ({ getValue, row }) => {
          const value = Number(getValue());
          const increasing = row.original.trendType === TrendType.INCREASE;

          return (
            <span
              className={
                increasing
                  ? "finance-trend finance-trend-up"
                  : row.original.trendType === TrendType.DECREASE
                  ? "finance-trend finance-trend-down"
                  : "finance-trend finance-trend-stable"
              }
            >
              {value > 0 ? "+" : ""}
              {value.toFixed(2)}%
            </span>
          );
        },
      },
      {
        accessorKey: "projectedNextMonth",
        header: "Ventas proyectadas",
        cell: ({ getValue }) => numberFormatter.format(Number(getValue())),
      },
      {
        accessorKey: "projectedRevenue",
        header: "Ingresos proyectados",
        cell: ({ getValue }) => currencyFormatter.format(Number(getValue())),
      },
      {
        accessorKey: "productHealth",
        header: "Estado",
        cell: ({ getValue }) => {
          const health = getValue<ProductHealth>();

          return <span className="finance-health">{health}</span>;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleModeChange = (value: FinancialProjectionMode) => {
    onModeChange(value);
    onFilterChange("ALL");
  };

  return {
    table,
    columns,
    handleModeChange,
  };
};
