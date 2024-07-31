import { IOtherContactInfo } from "@/controllers/CreateCustomer";
import { v4 } from "uuid";

export class Customer {
  public id!: string;
  public firstName!: string | undefined;
  public middleName!: string | undefined;
  public lastName!: string | undefined;
  public dateOfBirth: string | undefined;
  public gender: string | undefined;
  public county: string | undefined;
  public fixedAddress: boolean | undefined;
  public assistanceWithInsurance: boolean | undefined;
  public familyPlanningBenefits: boolean | undefined;
  public OtherContactInfo?: IOtherContactInfo | undefined;

  constructor(
    id?: string,
    first?: string,
    middle?: string,
    last?: string,
    dob?: string,
    gender?: string,
    county?: string,
    fixedAddress?: boolean,
    assistanceWithInsurance?: boolean,
    familyPlanningBenefits?: boolean,
    OtherContactInfo?: IOtherContactInfo | undefined
  ) {
    // Object.assign(this);

    if (!id) {
      this.id = v4();
      this.firstName = first;
      this.middleName = middle;
      this.lastName = last;
      this.dateOfBirth = dob;
      this.gender = gender;
      this.county = county;
      this.fixedAddress = fixedAddress;
      this.assistanceWithInsurance = assistanceWithInsurance;
      this.familyPlanningBenefits = familyPlanningBenefits;
      this.OtherContactInfo = OtherContactInfo;
    } else if (id) {
      this.id = id;
      this.firstName = first;
      this.middleName = middle;
      this.lastName = last;
      this.dateOfBirth = dob;
      this.gender = gender;
      this.county = county;
      this.fixedAddress = fixedAddress;
      this.assistanceWithInsurance = assistanceWithInsurance;
      this.familyPlanningBenefits = familyPlanningBenefits;
      this.OtherContactInfo = OtherContactInfo;
    }
  }
}

// {
//   "OtherContactInfo": {
//     "preferredContactMethod": "email",
//     "phone": {
//       "areaCode": "408",
//       "preFix": "867",
//       "lineNumber": "5309",
//       "phoneType": "Business"
//     },
//     "alternatePhone": {
//       "areaCode": "408",
//       "preFix": "867",
//       "lineNumber": "5309",
//       "phoneType": "Business"
//     },
//     "email": "jedwards@nope.com",
//     "preferredLanguage": "American Sign"
//   }
// }

// export class OtherContactInfo {
//   public preferredContactMethod?: string;

//   constructor(preferredContactMethod: string) {
//     this.preferredContactMethod = preferredContactMethod;
//   }
// }
