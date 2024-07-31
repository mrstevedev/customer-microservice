import { Request, Response } from "express";
import { CreateCustomerUseCase } from "@controllers/CreateCustomerUseCase";
import { validationResult, matchedData } from "express-validator";
import { ERROR } from "@/constants/constants";

export class CreateCustomerControllerClass {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  async handle(request: Request, response: Response) {
    const data = matchedData(request);
    const result = validationResult(request);

    const {
      id,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      county,
      fixedAddress,
      assistanceWithInsurance,
      familyPlanningBenefits,
      OtherContactInfo,
    } = data;

    if (!result.isEmpty()) {
      const resultMessage = result.array()[0]["msg"];
      return response.status(400).json({ error: resultMessage });
    }

    try {
      await this.createCustomerUseCase.execute({
        id,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        gender,
        county,
        fixedAddress,
        assistanceWithInsurance,
        familyPlanningBenefits,
        OtherContactInfo,
      });
      return response.sendStatus(201);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const message = err.message || ERROR.ERROR_UNEXPECTED;
        return response.status(500).send({ error: message });
      }
    }
  }
}
