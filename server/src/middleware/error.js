import ErrorHandler from "./ErrorHandler.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof ErrorHandler)
    res.status(err.statusCode).json({ error: err.messsge });
  return res.status(500).json({ err: `Something went wrong, try again later ${err}` });
}
