import { getAllProducts } from "../models/product.model.js";

import { asyncWrapper } from "../middleware/async.js";

import productDb from "../models/product.mongo.js";

import { getPagination } from "../services/query.js";

export const getAllProduct = asyncWrapper(async (req, res) => {
  const products = await getAllProducts();
  return res.status(200).json(products);
});

export const getProductByQuery = asyncWrapper(async (req, res) => {
  const { featured, company, name, sort, fields, nFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (nFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = nFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);
  let result = productDb.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const { skip, limit } = getPagination(req.query);
  result = result.skip(skip).limit(limit);

  const productQuery = await result;
  return res.status(200).json({ productQuery, bits: productQuery.length });
});
