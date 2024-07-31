import { Request, Response } from "express";
import { RefreshUserUseCase } from "./RefreshUserUseCase";

export class RefresControllerClass {
  constructor(private refreshUserUseCase: RefreshUserUseCase) {}

  async handle(request: Request, response: Response) {
    await this.refreshUserUseCase.refresh({ request, response });
  }
}
