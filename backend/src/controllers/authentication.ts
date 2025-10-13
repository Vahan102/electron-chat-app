import { Request, Response } from "express";
import { createSalt, createToken } from "../functions/functions.js"
import { sha256 } from "../cryptography/crypto.js"
import { getUser } from "../db/get.js";
import { addUser } from "../db/add.js";

export async function registrationController(req: Request, res: Response) {
  try {
    const { name, surname, email, password, avatar } = req.body;
    const user: any = await getUser(email);
    if (user == undefined) {
      res.status(409).send("Sorry,but this email is already taken.");
      return;
    }

    const solt: string = createSalt();
    const hashPassword: string = sha256(password + solt);
    await addUser([name, email, avatar, surname, solt, hashPassword]);
    res.send(JSON.stringify({ message: "User added." }));

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    if (typeof req.body.email == "string" && typeof req.body.password == "string") {
      const token: string | false = await createToken(req.body.email, req.body.password);
      if (typeof token == "string") {
        res.send(JSON.stringify({ token: token }));
      } else {
        console.log(token)
        res.status(404).send("Not Found.");
      }

    } else {
      res.status(400).json({
        message: "Validation failed."
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  }
}
