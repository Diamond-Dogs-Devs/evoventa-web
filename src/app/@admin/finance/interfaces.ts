import {
  GetSalesResponse,
  ProductProjection,
} from "@/shared/services/finance/domain";

import {
  FinancialDashboardStatus,
  FinancialPeriod,
  FinancialProjectionMode,
  FinancialTrendFilter,
} from "./types";

export interface FinancialDashboardData {
  sales: GetSalesResponse | null;
  revenueProjections: ProductProjection[];
  salesProjections: ProductProjection[];
}

export interface FinancialDashboardState {
  period: FinancialPeriod;
  data: FinancialDashboardData;
  status: FinancialDashboardStatus;
  error: string | null;
}

export interface FinancialFiltersProps {
  period: FinancialPeriod;
  onPeriodChange: (period: FinancialPeriod) => void;
  onSearch: () => void;
  loading: boolean;
}

export interface FinancialSummaryProps {
  data: FinancialDashboardData;
}

export interface FinancialSalesChartProps {
  data: GetSalesResponse | null;
}

export interface FinancialProjectionsTableProps {
  salesData: ProductProjection[];
  revenueData: ProductProjection[];
  filter: FinancialTrendFilter;
  mode: FinancialProjectionMode;
  onFilterChange: (filter: FinancialTrendFilter) => void;
  onModeChange: (mode: FinancialProjectionMode) => void;
}
