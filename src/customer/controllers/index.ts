import { CustomersRepository } from "@repository/implementations/CustomersRepository";

import { CreateCustomerControllerClass } from "@controllers/CreateCustomerControllerClass";
import { GetCustomerControllerClass } from "@controllers/GetCustomerControllerClass";

import { LoginControllerClass } from "@controllers/LoginControllerClass";
import { LogoutControllerClass } from "@controllers/LogoutControllerClass";
import { RefresControllerClass } from "@controllers/RefreshControllerClass";

import { LoginUserUseCase } from "@controllers/LoginUserUseCase";
import { LogoutUserUseCase } from "@controllers/LogoutUserUseCase";
import { RefreshUserUseCase } from "@controllers/RefreshUserUseCase";
import { GetCustomerUseCase } from "@controllers/GetCustomerUseCase";
import { CreateCustomerUseCase } from "@controllers/CreateCustomerUseCase";

const loginUseCase = new LoginUserUseCase();
const loginControllerClass = new LoginControllerClass(loginUseCase);

const refreshUseCase = new RefreshUserUseCase();
const refreshControllerClass = new RefresControllerClass(refreshUseCase);

const logoutUseCase = new LogoutUserUseCase();
const logoutControllerClass = new LogoutControllerClass(logoutUseCase);

const sqliteCustomerRepository = new CustomersRepository();

const createCustomerUseCase = new CreateCustomerUseCase(
  sqliteCustomerRepository
);
const createCustomerControllerClass = new CreateCustomerControllerClass(
  createCustomerUseCase
);

const getCustomerUseCase = new GetCustomerUseCase();
const getCustomerControllerClass = new GetCustomerControllerClass(
  getCustomerUseCase
);

export {
  loginUseCase,
  loginControllerClass,
  refreshUseCase,
  refreshControllerClass,
  logoutUseCase,
  logoutControllerClass,
  createCustomerControllerClass,
  createCustomerUseCase,
  getCustomerUseCase,
  getCustomerControllerClass,
};
