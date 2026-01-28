import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../cryptography/jwt.js";
import { JwtPayload } from "jsonwebtoken";
import { email } from "zod/v4";

export async function verificationToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
   
    const authentication: any = req.headers["authentication"];
    if (typeof authentication == "string") {
 
      const token: string = authentication.split(" ")[1];
      const verifytoken: string | JwtPayload | false = verifyToken(token);
      if (typeof verifytoken != "boolean" && typeof verifytoken == "object") {
        if ("email" in verifytoken && "password" in verifytoken) {
          let userObj = {password:verifytoken.password,email:verifytoken.email}
          req.body.user = userObj;
      
          next();
          return;
        }
      } else {
        res.status(400).send("The server cannot process the request.");
      };
    } else {
      res.status(400).send("The server cannot process the request.");
    };
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Server Error.");
  };
};