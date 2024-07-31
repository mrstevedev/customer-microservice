const { http, HttpResponse } = require("msw");

const handlers = [
  http.post("http://localhost:4000/customerinfo", (_resolver) => {
    return HttpResponse.json({ message: "Ok" }, { status: 201 });
  }),
];

module.exports = { handlers };
