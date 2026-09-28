import { DataColumn } from "@/shared/components/DataTable/type";
import {
  FinancialProjectionRow,
  ProductHealth,
} from "@/shared/services/finance/domain";
import { useMemo } from "react";

export const useFinanceMapper = () => {
  const mapProjectionColumns = (): DataColumn<FinancialProjectionRow>[] => [
    {
      key: "product",
      title: "Producto",
      subtitle: "Producto analizado",
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-800 whitespace-nowrap">
            {item.productName}
          </div>
          <div className="text-xs text-slate-400 whitespace-nowrap">
            ID: {item.id.slice(0, 8)}...
          </div>
        </div>
      ),
    },
    {
      key: "currentSales",
      title: "Ventas actuales",
      subtitle: "Unidades vendidas",
      render: (item) => (
        <span className="font-medium text-slate-700">
          {item.currentSales.toLocaleString("es-MX")}
        </span>
      ),
    },
    {
      key: "averageMonthlySales",
      title: "Promedio mensual",
      subtitle: "Unidades / mes",
      render: (item) => (
        <span>
          {item.averageMonthlySales.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "trend",
      title: "Tendencia",
      subtitle: "Variación mensual",
      render: (item) => (
        <span
          className={
            item.trend > 0
              ? "font-semibold text-emerald-600"
              : item.trend < 0
              ? "font-semibold text-red-600"
              : "font-semibold text-slate-500"
          }
        >
          {item.trend > 0 ? "+" : ""} {item.trend}
        </span>
      ),
    },
    {
      key: "trendPercentage",
      title: "Variación",
      subtitle: "Porcentaje de tendencia",
      render: (item) => (
        <span
          className={
            item.trendPercentage > 0
              ? "font-semibold text-emerald-600"
              : item.trendPercentage < 0
              ? "font-semibold text-red-600"
              : "font-semibold text-slate-500"
          }
        >
          {item.trendPercentage > 0 ? "+" : ""}
          {item.trendPercentage.toFixed(2)}%
        </span>
      ),
    },
    {
      key: "projectedNextMonth",
      title: "Ventas próximo mes",
      subtitle: "Proyección",
      render: (item) => (
        <span className="font-semibold text-slate-800">
          {Math.floor(item.projectedNextMonth)}
        </span>
      ),
    },
    {
      key: "projectedRevenue",
      title: "Ingreso proyectado",
      subtitle: "Próximo mes",
      render: (item) => (
        <span className="font-semibold text-slate-800">
          $
          {item.projectedRevenue.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "variance",
      title: "Varianza",
      subtitle: "Variabilidad de ventas",
      render: (item) => (
        <span>
          {item.variance.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "standardDeviation",
      title: "Desviación",
      subtitle: "Desviación estándar",
      render: (item) => (
        <span>
          {item.standardDeviation.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "trendType",
      title: "Tendencia",
      subtitle: "Comportamiento",
      render: (item) => (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {item.trendType}
        </span>
      ),
    },
    {
      key: "productHealth",
      title: "Estado",
      subtitle: "Salud del producto",
      render: (item) => {
        const styles = {
          [ProductHealth.GROWING]: "bg-emerald-100 text-emerald-700",
          [ProductHealth.STABLE]: "bg-blue-100 text-blue-700",
          [ProductHealth.DECLINING]: "bg-red-100 text-red-700",
          [ProductHealth.VOLATILE]: "bg-amber-100 text-amber-700",
        };
        return (
          <span
            className={`rounded-full whitespace-nowrap px-3 py-1 text-xs font-semibold ${
              styles[item.productHealth as keyof typeof styles]
            }`}
          >
            {item.productHealth}
          </span>
        );
      },
    },
  ];

  const mappedProjectionColumns = useMemo(() => {
    return mapProjectionColumns();
  }, [mapProjectionColumns]);

  return {
    mappedProjectionColumns,
  };
};
