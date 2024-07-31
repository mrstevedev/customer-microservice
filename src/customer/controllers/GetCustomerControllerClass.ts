import { Request, Response } from "express";
import { GetCustomerUseCase } from "@controllers/GetCustomerUseCase";

export class GetCustomerControllerClass {
  constructor(private getCustomerUseCase: GetCustomerUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      await this.getCustomerUseCase.execute({ request, response });
    } catch (err) {}
  }
}
