import { IGetCustomerRequest } from "@controllers/CreateCustomer";
import { prisma } from "@/client/prisma";

export class GetCustomerUseCase {
  constructor() {}

  async execute(data: IGetCustomerRequest) {
    const { response } = data;

    const customers = await prisma.customer.findMany({
      include: {
        OtherContactInfo: { include: { phone: true, alternatePhone: true } },
      },
    });

    return response.json(customers);
  }
}
