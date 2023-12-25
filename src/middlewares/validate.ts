import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// @todo format error messages to client friendly
const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    if (result.success) {
      return next();
    } else {
      const errors = result.error.flatten().fieldErrors.body;
      return res.status(400).send(errors);
    }
  };

export default validateSchema;
