import { ProductProjection } from "@/shared/services/finance/domain";
import { FinancialProjectionMode, FinancialTrendFilter } from "../../../types";

export type FinancialProyectionsTableProps = {
  mode: FinancialProjectionMode;
  salesData: ProductProjection[];
  revenueData: ProductProjection[];
  filter: FinancialTrendFilter;
  onModeChange: (mode: FinancialProjectionMode) => void;
  onFilterChange: (filter: FinancialTrendFilter) => void;
};
