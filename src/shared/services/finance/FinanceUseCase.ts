import {
  GetSalesResponse,
  IFinanceController,
  ProductProjection,
} from "./domain";

export class FinanceUseCase {
  constructor(private apiController: IFinanceController) {}
  async getSales(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<GetSalesResponse> {
    return this.apiController.getSales(token, startDate, endDate);
  }

  async getProjectRevenue(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]> {
    return this.apiController.getProjectRevenue(token, startDate, endDate);
  }

  async getProjectSales(
    token: string,
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]> {
    return this.apiController.getProjectSales(token, startDate, endDate);
  }
}
