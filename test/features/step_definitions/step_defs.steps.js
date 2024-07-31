const { getMockReq } = require("@jest-mock/express");
const { defineFeature, loadFeature } = require("jest-cucumber");
const {
  validateContactInfoObjFirstName,
  validateContactInfoObjLastName,
  validateContactInfoObjEmail,
  validateContactInfoObjJSON,
  validateAndReturnUser,
  validateContactInfoObjID,
  sendToPersistanceService,
} = require("../../utils");
const feature = loadFeature("test/features/ValidateContactInfo.feature");
const { http, HttpResponse } = require("msw");
const { setupServer } = require("msw/node");

const server = setupServer(
  http.post("http://localhost:4000/customerinfo", (_resolver) => {
    return HttpResponse.json({ messsage: "Ok" }, { status: 201 });
  })
);

defineFeature(feature, (test) => {
  const request = getMockReq({
    body: {
      id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
      firstName: "",
      middleName: "Robert",
      lastName: "",
      dateOfBirth: "2016-08-29",
      gender: "Male",
      county: "Anderson",
      fixedAddress: false,
      assistanceWithInsurance: false,
      familyPlanningBenefits: false,
      OtherContactInfo: {
        preferredContactMethod: "email",
        phone: {
          areaCode: "408",
          preFix: "867",
          lineNumber: "5309",
          phoneType: "Business",
        },
        alternatePhone: {
          areaCode: "408",
          preFix: "867",
          lineNumber: "5309",
          phoneType: "Business",
        },
        email: "jedwards@",
        preferredLanguage: "American Sign",
      },
    },
  });

  const requestValid = getMockReq({
    body: {
      id: "d290f1ee-6c54-4b01-90e6-d701748f0951",
      firstName: "Bob",
      middleName: "Robert",
      lastName: "BobsLastName",
      dateOfBirth: "2016-08-29",
      gender: "Male",
      county: "Anderson",
      fixedAddress: false,
      assistanceWithInsurance: false,
      familyPlanningBenefits: false,
      OtherContactInfo: {
        preferredContactMethod: "email",
        phone: {
          areaCode: "408",
          preFix: "867",
          lineNumber: "5309",
          phoneType: "Business",
        },
        alternatePhone: {
          areaCode: "408",
          preFix: "867",
          lineNumber: "5309",
          phoneType: "Business",
        },
        email: "jedwards@nope.com",
        preferredLanguage: "American Sign",
      },
    },
  });

  server.events.on("request:start", ({ request }) => {
    console.log("MSW intercepted:", request.method, request.url);
  });

  beforeEach(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("We have recieved a message that does not have a first name", ({
    given,
    when,
    then,
    and,
  }) => {
    given("A ContactInfo object", () => {
      expect.objectContaining(request.body);
    });

    when("the firstName field does not have a value", () => {
      expect(request.body.firstName).toBe("");
    });

    then("The error The first name must not be empty will be returned", () => {
      expect(() => {
        validateContactInfoObjFirstName(request.body);
      }).toThrow("The first name must not be empty");
    });

    and("the system will continue to the next test", () => {});
  });

  test("We have recieved a message that does not have a Last name", ({
    given,
    when,
    then,
    and,
  }) => {
    given("A ContactInfo object", () => {
      expect.objectContaining(request.body);
    });

    when("the lastName field does not have a value", () => {
      expect(request.body.lastName).toBe("");
    });

    then("The error The last name must not be empty will be returned", () => {
      expect(() => {
        validateContactInfoObjLastName(request.body);
      }).toThrow("The last name must not be empty");
    });

    and("the system will continue to the next test", () => {});
  });

  test("We have received a message that does not have a well formed email", ({
    given,
    when,
    then,
    and,
  }) => {
    given("A ContactInfo object", () => {
      expect.objectContaining(request.body);
    });

    when("the email field is not well formed", () => {
      expect.objectContaining(request.body.email);
    });

    then("The error The email given must be valid will be returned", () => {
      expect(() => {
        validateContactInfoObjEmail(request.body.OtherContactInfo.email);
      }).toThrow("The email given must be valid");
    });

    and("the system will continue to the next test", () => {});
  });

  test("We have recieved a message that is not well formed", ({
    given,
    when,
    then,
    and,
  }) => {
    given("The results of validation", () => {
      const mock = jest.fn();
      const json = JSON.stringify(request.body);
      mock(validateContactInfoObjJSON(json));
      expect(mock).toHaveReturned();
    });

    when("a validation has an error", () => {
      const invalidJSON = request.body;

      expect(() => {
        validateContactInfoObjJSON(invalidJSON);
      }).toThrow();
    });

    then("return the text of all errors", () => {
      const invalidJSON = request.body;

      expect(() => {
        validateContactInfoObjJSON(invalidJSON);
      }).toThrow("JSON is malformed");
    });

    and("return the status of 400", () => {
      const invalidJSON = request.body;

      try {
        expect(() => {
          validateContactInfoObjJSON(invalidJSON);
        }).toThrow(400);
      } catch (error) {
        return error.statusCode;
      }
    });
  });

  test("We have recieved a message with a duplicate id", ({
    given,
    when,
    then,
    and,
  }) => {
    given("a value in the id field", () => {
      expect(request.body.id).not.toBe("");
    });

    when("that id has already been registered", () => {
      const registeredId = validateAndReturnUser(request.body.id);
      expect(request.body.id).toContain(registeredId);
    });

    then("return the text of all errors", () => {
      const registeredId = request.body.id;
      expect(() => {
        validateContactInfoObjID(registeredId);
      }).toThrow("The id provided in the request already exists");
    });

    and("return the status of 409", () => {
      const userID = request.body.id;

      try {
        expect(() => {
          validateContactInfoObjID(userID);
        }).toThrow(409);
      } catch (error) {
        return error.statusCode;
      }
    });
  });

  test("We have recieved a valid message", ({ given, when, then, and }) => {
    given("the results of validation", () => {
      const isValid = requestValid;
      expect.objectContaining(isValid);
    });

    when("no validation errors are found", () => {
      const isValid = requestValid;
      expect.objectContaining(isValid);
    });

    then("send the message to the persistance service", () => {
      const message = JSON.stringify(request.body);
      const mock = jest.fn();
      mock(sendToPersistanceService(message));
      expect(mock).toHaveBeenCalled();
    });

    and("return the status of 201", async () => {
      const message = JSON.stringify(request.body);
      const messageResponse = await sendToPersistanceService(message);
      console.log("messsage response:", messageResponse);
      expect(messageResponse).toBe(201);
    });
  });
});
