import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      const err_msg = JSON.parse(err.message);
      res.status(400).json({ status: "Bad Request", message: err_msg[0] });
      return;
      // return res.status(400).json({
      //   status: "Bad Request",
      //   message: err.errors?.[0]?.message || "Invalid request data",
      // });
    }
  };
};

export default validate;
