import { ERROR } from "@/constants/constants";

export const createCustomerValidationSchema = {
  firstName: {
    notEmpty: {
      errorMessage: ERROR.ERROR_INVALID_FIRSTNAME,
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: ERROR.ERROR_INVALID_LASTNAME,
    },
  },
  id: { notEmpty: false },
  middleName: { notEmpty: true },
  dateOfBirth: { notEmpty: true },
  gender: { notEmpty: true },
  county: { notEmpty: true },
  fixedAddress: { notEmpty: true },
  assistanceWithInsurance: { notEmpty: true },
  familyPlanningBenefits: { notEmpty: true },

  // Other Contact Info Properties
  "OtherContactInfo.preferredContactMethod": { notEmpty: true },
  "OtherContactInfo.email": {
    isEmail: { errorMessage: ERROR.ERROR_INVALID_EMAIL },
  },
  "OtherContactInfo.preferredLanguage": { notEmpty: true },
  "OtherContactInfo.phone.areaCode": { notEmpty: true },
  "OtherContactInfo.phone.preFix": { notEmpty: true },
  "OtherContactInfo.phone.lineNumber": { notEmpty: true },
  "OtherContactInfo.phone.phoneType": { notEmpty: true },
  "OtherContactInfo.alternatePhone.areaCode": { notEmpty: true },
  "OtherContactInfo.alternatePhone.preFix": { notEmpty: true },
  "OtherContactInfo.alternatePhone.lineNumber": { notEmpty: true },
  "OtherContactInfo.alternatePhone.phoneType": { notEmpty: true },
};
