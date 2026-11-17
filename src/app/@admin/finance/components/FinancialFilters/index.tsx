"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DashboardCard } from "@/shared/components/DashboardCard";

import { FinancialFiltersProps } from "../../interfaces";
import { Button } from "@/shared/ui/src";

const FinancialFilters = ({
  period,
  onPeriodChange,
  onSearch,
  loading,
}: FinancialFiltersProps) => {
  return (
    <DashboardCard
      title="Periodo financiero"
      description="Selecciona el periodo que deseas analizar."
    >
      <div className="finance-filters">
        <div className="finance-filter-field">
          <label htmlFor="finance-start-date">Fecha inicial</label>

          <DatePicker
            id="finance-start-date"
            selected={period.startDate}
            onChange={(date: Date | null) => {
              if (date) {
                onPeriodChange({
                  ...period,
                  startDate: date,
                });
              }
            }}
            selectsStart
            startDate={period.startDate}
            endDate={period.endDate}
            maxDate={period.endDate}
            dateFormat="dd/MM/yyyy"
            className="finance-date-input"
            placeholderText="Fecha inicial"
          />
        </div>

        <div className="finance-filter-field">
          <label htmlFor="finance-end-date">Fecha final</label>

          <DatePicker
            id="finance-end-date"
            selected={period.endDate}
            onChange={(date: Date | null) => {
              if (date) {
                onPeriodChange({
                  ...period,
                  endDate: date,
                });
              }
            }}
            selectsEnd
            startDate={period.startDate}
            endDate={period.endDate}
            minDate={period.startDate}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="finance-date-input"
            placeholderText="Fecha final"
          />
        </div>

        <Button
          type="button"
          onClick={onSearch}
          disabled={loading}
          className="finance-search-button"
        >
          {loading ? "Consultando..." : "Mostrar resultados"}
        </Button>
      </div>
    </DashboardCard>
  );
};

export default FinancialFilters;
