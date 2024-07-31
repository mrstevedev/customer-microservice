import { Request, Response } from "express";
import { LogoutUserUseCase } from "./LogoutUserUseCase";

export class LogoutControllerClass {
  constructor(private logoutUserUseCase: LogoutUserUseCase) {}

  async handle(request: Request, response: Response) {
    await this.logoutUserUseCase.logout({ request, response });
  }
}
