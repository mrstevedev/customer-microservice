import { Request, Response } from "express";
import { LoginUserUseCase } from "@controllers/LoginUserUseCase";
import { validationResult, matchedData } from "express-validator";

export class LoginControllerClass {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(request: Request, response: Response) {
    const data = matchedData(request);
    const result = validationResult(request);
    const { username, password } = data;

    if (!result.isEmpty()) {
      const resultMessage = result.array()[0]["msg"];
      return response.status(400).json({ error: resultMessage });
    }

    try {
      await this.loginUserUseCase.login({
        request,
        response,
        username,
        password,
      });
    } catch (err: unknown) {
      console.error(err);
    }
  }
}
