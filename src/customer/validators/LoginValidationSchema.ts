export const loginValidationSchema = {
  username: {
    isEmpty: {
      negated: true,
      errorMessage: "Missing username field",
    },
  },
  password: {
    isEmpty: {
      negated: true,
      errorMessage: "Missing password field",
    },
  },
};
