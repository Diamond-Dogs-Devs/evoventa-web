import { currencyFormatter, numberFormatter } from "@/shared/utils/numbers";
import { FinancialSummaryProps } from "../../../interfaces";

export const useFinancialSummary = ({ data }: FinancialSummaryProps) => {
  const { sales, revenueProjections, salesProjections } = data;

  const totalRevenue = sales?.meta.totalAmount ?? 0;
  const totalOrders = sales?.meta.totalOrders ?? 0;
  const totalItems = sales?.meta.totalItems ?? 0;

  const averageOrder = totalOrders ? totalRevenue / totalOrders : 0;

  const projectedRevenue = revenueProjections.reduce(
    (total, product) => total + product.projectedRevenue,
    0
  );

  const projectedSales = salesProjections.reduce(
    (total, product) => total + product.projectedNextMonth,
    0
  );

  const metrics = [
    {
      title: "Ingresos obtenidos",
      value: currencyFormatter.format(totalRevenue),
      description: "Ingresos reales del periodo",
    },
    {
      title: "Órdenes pagadas",
      value: numberFormatter.format(totalOrders),
      description: "Órdenes procesadas",
    },
    {
      title: "Unidades vendidas",
      value: numberFormatter.format(totalItems),
      description: "Artículos comercializados",
    },
    {
      title: "Ticket promedio",
      value: currencyFormatter.format(averageOrder),
      description: "Ingreso promedio por orden",
    },
    {
      title: "Ingresos proyectados",
      value: currencyFormatter.format(projectedRevenue),
      description: "Proyección del siguiente mes",
    },
    {
      title: "Ventas proyectadas",
      value: numberFormatter.format(projectedSales),
      description: "Unidades para el siguiente mes",
    },
  ];

  return {
    metrics,
  };
};
