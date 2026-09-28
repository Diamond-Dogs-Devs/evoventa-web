"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Page from "@/shared/components/Page";
import { useFinance } from "@/shared/hooks/finance/useFinance";
import { DashboardCard } from "@/shared/components/DashboardCard";
import DataTable from "@/shared/components/DataTable";
import { useFinanceMapper } from "@/shared/hooks/finance/useFinanceMapper";
import { getGreeting } from "@/shared/utils/agent";

const IndexPage = () => {
  const { financeMonthly, mapProjectionData } = useFinance();
  const { mappedProjectionColumns } = useFinanceMapper();
  const greeting = getGreeting();
  const title = `${greeting} | Información de venta`;
  return (
    <Page
      title={title}
      subtitle="Información de las ventas que llevas en el año y proyecciones de ventas en los proximos meses"
    >
      <DashboardCard title="Ventas en el año">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={financeMonthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" name="Ventas" />
            <Line
              type="monotone"
              dataKey="projection"
              name="Proyección"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <DashboardCard title="Proyección de ventas anualizado">
          <DataTable
            columns={mappedProjectionColumns}
            data={mapProjectionData}
          />
        </DashboardCard>
      </div>
    </Page>
  );
};

export default IndexPage;
