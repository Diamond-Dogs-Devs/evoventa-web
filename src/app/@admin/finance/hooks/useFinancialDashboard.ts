"use client";

import { useCallback, useRef, useState } from "react";

import { useSecurity } from "@/shared/hooks/useSecurity";
import { FinanceController } from "@/shared/services/finance/FinanceController";

import type {
  FinancialDashboardData,
  FinancialDashboardState,
} from "../interfaces";

import type { FinancialPeriod } from "../types";

const INITIAL_DATA: FinancialDashboardData = {
  sales: null,
  revenueProjections: [],
  salesProjections: [],
};

const getInitialPeriod = (): FinancialPeriod => {
  const now = new Date();

  return {
    startDate: new Date(now.getFullYear(), 0, 1),
    endDate: now,
  };
};

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const useFinancialDashboard = () => {
  const { token } = useSecurity();
  const requestId = useRef(0);

  const [state, setState] = useState<FinancialDashboardState>({
    period: getInitialPeriod(),
    data: INITIAL_DATA,
    status: "IDLE",
    error: null,
  });

  const handlePeriodChange = useCallback((period: FinancialPeriod) => {
    requestId.current += 1;

    setState((previous) => ({
      ...previous,
      period,
      status: "IDLE",
      error: null,
    }));
  }, []);

  const getFinancialData = useCallback(async () => {
    if (!token) {
      setState((previous) => ({
        ...previous,
        status: "ERROR",
        error: "No se encontró una sesión válida.",
      }));
      return;
    }

    const { startDate, endDate } = state.period;

    if (
      !(startDate instanceof Date) ||
      !(endDate instanceof Date) ||
      !Number.isFinite(startDate.getTime()) ||
      !Number.isFinite(endDate.getTime()) ||
      startDate > endDate
    ) {
      setState((previous) => ({
        ...previous,
        status: "ERROR",
        error: "El periodo seleccionado no es válido.",
      }));
      return;
    }

    const currentRequest = ++requestId.current;

    setState((previous) => ({
      ...previous,
      status: "LOADING",
      error: null,
    }));

    try {
      const controller = new FinanceController(token);

      const start = formatLocalDate(startDate);
      const end = formatLocalDate(endDate);

      const [sales, revenueProjections, salesProjections] = await Promise.all([
        controller.getSales(start, end),
        controller.getProjectRevenue(start, end),
        controller.getProjectSales(start, end),
      ]);

      if (currentRequest !== requestId.current) return;

      setState((previous) => ({
        ...previous,
        data: {
          sales,
          revenueProjections,
          salesProjections,
        },
        status: "SUCCESS",
        error: null,
      }));
    } catch {
      if (currentRequest !== requestId.current) return;

      setState((previous) => ({
        ...previous,
        status: "ERROR",
        error: "No fue posible obtener la información financiera.",
      }));
    }
  }, [token, state.period]);

  return {
    ...state,
    handlePeriodChange,
    getFinancialData,
  };
};
