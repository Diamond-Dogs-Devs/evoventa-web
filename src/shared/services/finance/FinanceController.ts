import { GetSalesResponse, ProductProjection } from "./domain";
import { FinanceApiController } from "./FinanceApiController";
import { FinanceUseCase } from "./FinanceUseCase";

export class FinanceController {
  private useCase: FinanceUseCase;
  constructor(private token: string) {
    const controller = new FinanceApiController();
    this.useCase = new FinanceUseCase(controller);
  }

  async getSales(
    startDate?: string,
    endDate?: string
  ): Promise<GetSalesResponse> {
    return this.useCase.getSales(this.token, startDate, endDate);
  }

  async getProjectRevenue(
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]> {
    return this.useCase.getProjectRevenue(this.token, startDate, endDate);
  }

  async getProjectSales(
    startDate?: string,
    endDate?: string
  ): Promise<ProductProjection[]> {
    return this.useCase.getProjectSales(this.token, startDate, endDate);
  }
}
