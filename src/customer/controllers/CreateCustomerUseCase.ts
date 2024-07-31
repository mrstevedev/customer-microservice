import { prisma } from "@client/prisma";
import { ERROR } from "@constants/constants";
import { Customer } from "@entities/Customer";
import { ICreateCustomerRequest } from "@controllers/CreateCustomer";
import { ICustomersRepository } from "@repository/ICustomersRepository";

export class CreateCustomerUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(data: ICreateCustomerRequest) {
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
      OtherContactInfo: Other,
    } = data;

    // Check Customer ID
    const customers = await prisma.customer.findMany();
    for (let customer of customers) {
      if (String(customer.id) === id) {
        throw new Error(ERROR.ERROR_DUPLICATE_ID);
      }
    }

    // Create Customer
    const customer = new Customer(
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
      Other
    );

    await this.customersRepository.create(customer);
  }
}
