import app from "@/app";
// import { server } from "mocks/handlers";

/**
 * As of Node.js V20.6.0+ we no longer need the dotenv package
 * to load environment variables 🎉
 */
const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () =>
  console.log(`Customer service is running on port: ${PORT}`)
);
