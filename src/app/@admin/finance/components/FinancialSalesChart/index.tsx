"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardCard } from "@/shared/components/DashboardCard";

import { FinancialSalesChartProps } from "../../interfaces";

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const FinancialSalesChart = ({ data }: FinancialSalesChartProps) => {
  const monthlySales = data?.monthlySales ?? [];

  return (
    <DashboardCard
      title="Comportamiento de ventas"
      description="Ventas e ingresos registrados durante el periodo."
    >
      {!monthlySales.length ? (
        <div className="finance-empty-state">
          No existen ventas para el periodo seleccionado.
        </div>
      ) : (
        <div className="finance-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlySales}
              margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="period" />

              <YAxis yAxisId="sales" allowDecimals={false} />

              <YAxis
                yAxisId="revenue"
                orientation="right"
                tickFormatter={(value) =>
                  `$${Number(value).toLocaleString("es-MX")}`
                }
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "Ingresos") {
                    return [currencyFormatter.format(Number(value)), name];
                  }

                  return [Number(value).toLocaleString("es-MX"), name];
                }}
              />

              <Legend />

              <Line
                yAxisId="sales"
                type="monotone"
                dataKey="sales"
                name="Ventas"
                stroke="#2563eb"
                strokeWidth={2.5}
                activeDot={{ r: 6 }}
              />

              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                name="Ingresos"
                stroke="#16a34a"
                strokeWidth={2.5}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default FinancialSalesChart;
