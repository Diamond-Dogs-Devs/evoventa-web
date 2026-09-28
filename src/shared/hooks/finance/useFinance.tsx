"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSecurity } from "../useSecurity";
import { FinanceController } from "@/shared/services/finance/FinanceController";
import {
  MonthlySales,
  ProductProjection,
} from "@/shared/services/finance/domain";

export const useFinance = () => {
  const [financeMonthly, setFinanceMonthly] = useState<MonthlySales[]>([]);
  const [projectionSale, setProjectionSales] = useState<ProductProjection[]>(
    []
  );
  const { token } = useSecurity();
  const initialData = useCallback(async () => {
    if (token) {
      const controller = new FinanceController(token);
      const data = await controller.getSales();
      const projectSales = await controller.getProjectRevenue();
      setProjectionSales(projectSales);
      setFinanceMonthly(data.monthlySales);
    }
  }, [token]);

  const mapProjectionData = useMemo(() => {
    return projectionSale.map((item) => ({
      id: item.productId,
      productName: item.productName,
      currentSales: item.currentSales,
      averageMonthlySales: item.averageMonthlySales,
      trend: item.trend,
      trendPercentage: item.trendPercentage,
      projectedNextMonth: item.projectedNextMonth,
      projectedRevenue: item.projectedRevenue,
      variance: item.variance,
      standardDeviation: item.standardDeviation,
      trendType: item.trendType,
      productHealth: item.productHealth,
    }));
  }, [projectionSale]);

  useEffect(() => {
    initialData();
  }, [initialData]);

  return {
    financeMonthly,
    projectionSale,
    mapProjectionData,
  };
};
