const { http, HttpResponse } = require("msw");

function validateContactInfoObjFirstName(obj) {
  if (obj.hasOwnProperty("firstName")) {
    if (Object.values(obj).includes("")) {
      throw new Error("The first name must not be empty");
    }
  }
  return obj;
}

function validateContactInfoObjLastName(obj) {
  if (obj.hasOwnProperty("lastName")) {
    if (Object.values(obj).includes("")) {
      throw new Error("The last name must not be empty");
    }
  }
  return obj;
}

function validateContactInfoObjEmail(sEmail) {
  const reEmail =
    /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

  if (!sEmail.match(reEmail)) {
    throw new Error("The email given must be valid");
  }

  return true;
}

function validateContactInfoObjJSON(str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    throw new ValidationError("JSON is malformed");
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = this.constructor.name;
  }
}

class ValidationErrorID extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = this.constructor.name;
  }
}

function validateAndReturnUser(id) {
  const foundUser = "d290f1ee-6c54-4b01-90e6-d701748f0851";
  if (foundUser === id) {
    return foundUser;
  }
  return false;
}

function validateContactInfoObjID(id) {
  const user = "d290f1ee-6c54-4b01-90e6-d701748f0851";
  try {
    if (user === id) {
      throw new ValidationErrorID(
        "The id provided in the request already exists"
      );
    }
    return user;
  } catch (event) {
    throw new ValidationErrorID(
      "The id provided in the request already exists"
    );
  }
}

async function sendToPersistanceService() {
  const response = await fetch("http://localhost:4000/customerinfo", {
    method: "POST",
  });
  return await response.status;
}

module.exports = {
  validateAndReturnUser,
  validateContactInfoObjFirstName,
  validateContactInfoObjLastName,
  validateContactInfoObjEmail,
  validateContactInfoObjJSON,
  validateContactInfoObjID,
  sendToPersistanceService,
};
