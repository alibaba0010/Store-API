import { Router } from "express";

const productRouter = Router();

import {
  getAllProduct,
  getProductByQuery,
} from "../controllers/product.controller.js";

import { populateProduct } from "../../populate.js";

productRouter.route("/products").get(getAllProduct);
productRouter.route("/product").get(getProductByQuery);

productRouter.route("/products/static").get(populateProduct);

export default productRouter;
