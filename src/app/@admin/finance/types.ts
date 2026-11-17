export type FinancialPeriod = {
  startDate: Date;
  endDate: Date;
};

export type FinancialDashboardStatus = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";

export type FinancialTrendFilter = "ALL" | "INCREASE" | "DECREASE";

export type FinancialProjectionMode = "SALES" | "REVENUE";
