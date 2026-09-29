export enum TrendType {
  INCREASE = "A LA ALZA",
  DECREASE = "A LA BAJA",
  STABLE = "ESTABLE",
}

export enum ProductHealth {
  GROWING = "A LA ALZA",
  STABLE = "ESTABLE",
  DECLINING = "A LA BAJA",
  VOLATILE = "VOLATIL",
}

export interface FinancialOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  updatedAt: Date;
}

export interface ProductProjection {
  productId: string;
  productName: string;
  currentSales: number;
  averageMonthlySales: number;

  trend: number;
  trendPercentage: number;

  projectedNextMonth: number;
  projectedRevenue: number;

  variance: number;
  standardDeviation: number;

  trendType: TrendType;
  productHealth: ProductHealth;
}

export interface YearlyEstimate {
  productId: string;

  currentYearSales: number;
  previousYearsAverage: number;

  estimatedSales: number;
  estimatedRevenue: number;

  growthPercentage: number;
}

export interface FinancialInitialData {
  orders: Array<{
    id: string;
    orderNumber: string;
    totalAmount: number;
    totalItems: number;
    updatedAt: Date;
  }>;

  items: FinancialOrderItem[];
}

export interface FinancialSalesData {
  productId: string;
  quantity: number;
  price: number;
  updatedAt: Date | string;
}

export interface MonthlySales {
  period: string;
  sales: number;
  revenue: number;
}

export type GetSalesResponse = {
  data: FinancialOrderItem[];
  monthlySales: MonthlySales[];
  meta: {
    startDate: Date;
    endDate: Date;
    totalOrders: number;
    totalItems: number;
    totalAmount: number;
  };
};

export interface IFinanceController {
  getSales(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<GetSalesResponse>;
  getProjectSales(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]>;
  getProjectRevenue(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]>;
}

export interface FinancialProjectionRow {
  id: string;
  productName: string;
  currentSales: number;
  averageMonthlySales: number;
  trend: number;
  trendPercentage: number;
  projectedNextMonth: number;
  projectedRevenue: number;
  variance: number;
  standardDeviation: number;
  trendType: string;
  productHealth: string;
}
