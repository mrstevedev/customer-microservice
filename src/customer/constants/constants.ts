export enum ROUTE {
  ROUTE_LOGIN = "/login",
  ROUTE_LOGOUT = "/logout",
  ROUTE_REFRESH = "/refresh",
  ROUTE_CUSTOMER_INFO = "/customerinfo",
}

export enum NAME {
  REFRESH_TOKEN = "refreshToken",
}

export enum ERROR {
  ERROR_TOKEN_EXPIRED = "Token has expired. Please login",
  ERROR_USER_NOT_FOUND = "The username provided was not found",
  ERROR_UNAUTHORIZED = "You are not authorized to perform this action",
  ERROR_DUPLICATE_ID = "The id provided in the request already exists",
  ERROR_INVALID_JSON = "The request is malformed. Not valid JSON",
  ERROR_INVALID_CREDENTIALS = "The password is invalid",
  ERROR_INVALID_EMAIL = "The email given must be valid",
  ERROR_UNEXPECTED = "Unexpected error has occured",
  ERROR_INVALID_FIRSTNAME = "The first name must not be empty",
  ERROR_INVALID_LASTNAME = "The last name must not be empty",
}
