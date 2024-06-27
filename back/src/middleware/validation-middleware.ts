import { Request, Response, NextFunction } from "express";
import yup from "yup";

const validate =
  (schema: yup.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      next(e);
    }
  };

export default validate;
