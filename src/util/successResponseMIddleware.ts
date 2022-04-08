import mung from "express-mung";
import { hostname } from "os";
const successResponseMiddlware = mung.json((body, req, res) => {
  const records = Array.isArray(body) ? body : [body];
  const { offset = 0, limit = 50 } = req.query;
  const meta = {
    version: "0.0.1",
    server: hostname(),
    recordCount: records.length,
    limit,
    offset,
  };
  body = {
    meta,
    records,
  };
  return body;
});

export { successResponseMiddlware };
