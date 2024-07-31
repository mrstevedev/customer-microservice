import express from "express";
const app = express();

import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import loginRoute from "@routes/login";
import logoutRoute from "@routes/logout";
import refreshRoute from "@routes/refresh";
import customerRoute from "@routes/customer";

import { ROUTE } from "@constants/constants";
import parseJSON from "@middleware/parseJson";

const ORIGIN = process.env.ORIGIN_URL;

// Add Middleware
app.use(parseJSON);
app.use(helmet());
app.use(helmet.hsts({ maxAge: 300, includeSubDomains: true, preload: true }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  })
);

// Register API route(s)
app.use(ROUTE.ROUTE_LOGIN, loginRoute);
app.use(ROUTE.ROUTE_LOGOUT, logoutRoute);
app.use(ROUTE.ROUTE_REFRESH, refreshRoute);
app.use(ROUTE.ROUTE_CUSTOMER_INFO, customerRoute);

export default app;
