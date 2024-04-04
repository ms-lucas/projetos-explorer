import express from "express";
import "express-async-errors";

import { migrationsRun } from "./database/sqlite/migrations/index.js";
import { routes } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";

const app = express();

app.use(express.json());
app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

app.listen(3333, () => console.log("HTTP server is running..."));
