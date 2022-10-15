import productDb from "./product.mongo.js";

export async function getAllProducts() {
  return await productDb.find({}, { _id: 0, __v: 0 });
}

