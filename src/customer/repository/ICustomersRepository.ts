import { Customer } from "@/entities/Customer";

export interface ICustomersRepository {
  findById(id: string): Promise<Customer>;
  create(customer: Customer): Promise<void>;
}
