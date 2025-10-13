import { Request, Response } from "express";
import { getSereversParametrs } from "../db/get.js";
import { verificationOfUser } from "../functions/functions.js";
import { deleteServer } from "../db/delete.js";

export async function deleteServerController(req: Request, res: Response) {
  try {
    const { email, password }: any = req.body.user;
    const link = req.body.link;
    const server = await getSereversParametrs(link);
    const userVerification = await verificationOfUser(email, password);
    if (Array.isArray(server)) {
      if (server.length > 0) {
        if (userVerification) {
          await deleteServer(link);
          res.send("Server successfully deleted.")
        } else {
          res.status(400).send("Bad request.");
        }
      } else {
        res.status(400).send("Bad request.");
      }
    } else {
      res.status(500).send("Internal Server Error.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  }
};