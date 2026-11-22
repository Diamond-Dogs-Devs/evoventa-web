"use client";

import { useState } from "react";

import Page from "@/shared/components/Page";

import FinancialFilters from "./components/FinancialFilters";
import FinancialSummary from "./components/FinancialSummary";
import FinancialSalesChart from "./components/FinancialSalesChart";
import FinancialProjectionsTable from "./components/FinancialProjectionsTable";

import { useFinancialDashboard } from "./hooks/useFinancialDashboard";

import { FinancialProjectionMode, FinancialTrendFilter } from "./types";

import "./styles.css";

const FinancePage = () => {
  const { period, data, status, error, handlePeriodChange, getFinancialData } =
    useFinancialDashboard();

  const [trendFilter, setTrendFilter] = useState<FinancialTrendFilter>("ALL");

  const [projectionMode, setProjectionMode] =
    useState<FinancialProjectionMode>("SALES");

  const hasResults = status === "SUCCESS";

  return (
    <Page
      title="Información financiera"
      subtitle="Analiza el comportamiento financiero de tu CRM y consulta las proyecciones de ventas e ingresos."
    >
      <div className="finance-page">
        <FinancialFilters
          period={period}
          onPeriodChange={handlePeriodChange}
          onSearch={getFinancialData}
          loading={status === "LOADING"}
        />

        {status === "ERROR" && (
          <div className="finance-error" role="alert">
            {error}
          </div>
        )}

        {status === "LOADING" && (
          <div className="finance-loading" role="status" aria-live="polite">
            Consultando información financiera...
          </div>
        )}

        {hasResults && (
          <>
            <FinancialSummary data={data} />

            <FinancialSalesChart data={data.sales} />

            <FinancialProjectionsTable
              salesData={data.salesProjections}
              revenueData={data.revenueProjections}
              filter={trendFilter}
              mode={projectionMode}
              onFilterChange={setTrendFilter}
              onModeChange={setProjectionMode}
            />
          </>
        )}

        {status === "IDLE" && (
          <div className="finance-empty-state">
            Selecciona un periodo y presiona Mostrar resultados para consultar
            la información financiera.
          </div>
        )}
      </div>
    </Page>
  );
};

export default FinancePage;
