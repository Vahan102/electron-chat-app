import { Request, Response, NextFunction } from "express";
import z, { string } from "zod";

interface Schema {
  [key: string]: z.ZodObject<any>;
}

const zodschema: Schema = {
  reg: z.object({
    name: z.string().min(2).max(15),
    surname: z.string().min(2).max(16),
    email: z.string().email(),
    password: z.string().min(8).max(100),
  }),
  login: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
  }),
  //all
  name: z.object({
    name: z.string(),
  }),
  link: z.object({
    link: z.string()
  }),
  tagname: z.object({
    name:z.string(),
    tag:z.string()
  }),
  email: z.object({
    email:z.string()
  }),
  emailandlink: z.object({
    email:z.string(),
    link:z.string()
  }),
};

export function validation(
  schemaKey: string,
  name: "body" | "query" | "params"
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const zodData = zodschema[schemaKey];
      const bodyData: any = req[name];
      zodData.parse(bodyData);
      
      next();
      return;
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation failed.",
          errors: err.errors,
        });
        return;
      } else {
        res.status(500).json({
          message: "Internal server error.",
          errors: "An unknown error occurred.",
        });
        return;
      }
    }
  };
};
