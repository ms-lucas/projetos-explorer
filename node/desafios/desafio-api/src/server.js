import "express-async-errors";

import express from "express";

import { errorHandler } from "./middlewares/error-handler.js";
import { routes } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(3333, () => console.log("HTTP server running..."));
