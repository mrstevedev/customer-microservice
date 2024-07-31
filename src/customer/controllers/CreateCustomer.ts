import { Request, Response } from "express";

export interface ICreateCustomerRequest {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  county: string;
  fixedAddress: boolean;
  assistanceWithInsurance: boolean;
  familyPlanningBenefits: boolean;
  OtherContactInfo: IOtherContactInfo;
}

export interface IOtherContactInfo {
  preferredContactMethod?: string;
  phone: {
    areaCode: string;
    preFix: string;
    lineNumber: string;
    phoneType: string;
  };
  alternatePhone: {
    areaCode: string;
    preFix: string;
    lineNumber: string;
    phoneType: string;
  };
  email: string;
  preferredLanguage: string;
}

export interface IGetCustomerRequest {
  request: Request;
  response: Response;
}

export interface ILoginUserRequest {
  username: string;
  password: string;
  request: Request;
  response: Response;
}
