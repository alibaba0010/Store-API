// import productJson from "./products.json";

import productDb from "./src/models/product.mongo.js";

import { createRequire } from "module";

const require = createRequire(import.meta.url);

const productJson = require("./products.json");

export const populateProduct = async () => {
  try {
    const products = await productDb.create(productJson);
    console.log(`Success!! ${products.length}`);
    return { products };
  } catch (e) {
    console.log(e);
  }
};
