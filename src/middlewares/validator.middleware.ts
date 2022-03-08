import { NextFunction, Response, Request } from "express";

export const validate =
  (schema?: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await schema.validate(req.body);

      return next();
    } catch (err: any) {
      return res.json({ status: "error", data: null, message: err.message });
    }
  };
