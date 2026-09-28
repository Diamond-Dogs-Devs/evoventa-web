import axios from "axios";
import {
  GetSalesResponse,
  IFinanceController,
  ProductProjection,
} from "./domain";
import { URL_FINANCE } from "@/shared/urls";
import { getYearDateRange } from "@/shared/utils/dates";

export class FinanceApiController implements IFinanceController {
  private getDates(s?: string, e?: string) {
    const { startDate, endDate } = getYearDateRange();
    return {
      start: s ? `?startDate=${s}` : `?startDate=${startDate}`,
      end: e ? `&endDate=${e}` : `&endDate=${endDate}`,
    };
  }

  async getSales(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<GetSalesResponse> {
    const { start, end } = this.getDates(startDate, endDate);
    const { data } = await axios.get<GetSalesResponse>(
      `${URL_FINANCE}/paid-orders${start}${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
  async getProjectRevenue(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]> {
    const { start, end } = this.getDates(startDate, endDate);
    const { data } = await axios.get<ProductProjection[]>(
      `${URL_FINANCE}/projection/revenue${start}${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  async getProjectSales(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]> {
    const { start, end } = this.getDates(startDate, endDate);
    const { data } = await axios.get<ProductProjection[]>(
      `${URL_FINANCE}/projection/sales${start}${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
}
