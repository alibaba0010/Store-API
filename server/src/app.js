console.log("04 Store API");

import express, { json } from "express";

import "express-async-errors";

import productRouter from "./routes/product.router.js";

import { errorHandler } from "./middleware/error.js";

import { routeError } from "./middleware/route.error.js";

const app = express();

app
  .use(json())
  .use("/api/v1/", productRouter)
  .use(routeError)
  .use(errorHandler);

export default app;
