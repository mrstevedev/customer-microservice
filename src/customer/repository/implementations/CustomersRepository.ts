import { ICustomersRepository } from "@repository/ICustomersRepository";
import { Customer } from "@/entities/Customer";
import { prisma } from "@/client/prisma";

export class CustomersRepository implements ICustomersRepository {
  async findById(id: string): Promise<Customer> {
    const customer: any = prisma.customer.findFirst({ where: { id } });

    return customer;
  }

  async create(customer: Customer): Promise<void> {
    const id = customer.id;
    const firstName = customer.firstName as string;
    const middleName = customer.middleName as string;
    const lastName = customer.lastName as string;
    const dateOfBirth = customer.dateOfBirth as string;
    const gender = customer.gender as string;
    const county = customer.county as string;
    const fixedAddress = customer.fixedAddress as boolean;
    const assistanceWithInsurance = customer.assistanceWithInsurance as boolean;
    const familyPlanningBenefits = customer.familyPlanningBenefits as boolean;

    const preferredContactMethod = customer.OtherContactInfo
      ?.preferredContactMethod as string;

    const email = customer.OtherContactInfo?.email as string;
    const preferredLanguage = customer.OtherContactInfo
      ?.preferredLanguage as string;

    const areaCode = customer.OtherContactInfo?.phone.areaCode as string;
    const preFix = customer.OtherContactInfo?.phone.preFix as string;
    const lineNumber = customer.OtherContactInfo?.phone.lineNumber as string;
    const phoneType = customer.OtherContactInfo?.phone.phoneType as string;

    const areaCode2 = customer.OtherContactInfo?.alternatePhone
      .areaCode as string;
    const preFix2 = customer.OtherContactInfo?.alternatePhone.preFix as string;
    const lineNumber2 = customer.OtherContactInfo?.alternatePhone
      .lineNumber as string;
    const phoneType2 = customer.OtherContactInfo?.alternatePhone
      .phoneType as string;

    try {
      await prisma.customer.create({
        data: {
          id: id,
          firstName,
          middleName,
          lastName,
          dateOfBirth,
          gender,
          county,
          fixedAddress,
          assistanceWithInsurance,
          familyPlanningBenefits,
          OtherContactInfo: {
            create: {
              email: email,
              preferredLanguage: preferredLanguage,
              preferredContactMethod: preferredContactMethod,
              phone: {
                create: {
                  areaCode: areaCode,
                  preFix: preFix,
                  lineNumber: lineNumber,
                  phoneType: phoneType,
                },
              },
              alternatePhone: {
                create: {
                  areaCode: areaCode2,
                  preFix: preFix2,
                  lineNumber: lineNumber2,
                  phoneType: phoneType2,
                },
              },
            },
          },
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
}
