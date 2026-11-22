import { DashboardCard } from "@/shared/components/DashboardCard";

import { FinancialSummaryProps } from "../../interfaces";
import { useFinancialSummary } from "./hooks/useFinancialSummary";

const FinancialSummary = ({ data }: FinancialSummaryProps) => {
  const { metrics } = useFinancialSummary({ data });

  return (
    <div className="finance-summary-grid">
      {metrics.map((metric) => (
        <DashboardCard key={metric.title}>
          <div className="finance-metric">
            <span className="finance-metric-title">{metric.title}</span>

            <strong className="finance-metric-value">{metric.value}</strong>

            <span className="finance-metric-description">
              {metric.description}
            </span>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};

export default FinancialSummary;
