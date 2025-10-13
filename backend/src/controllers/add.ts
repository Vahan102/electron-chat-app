import { createLink } from "../cryptography/crypto.js"
import { Request, Response } from "express";
import { addChannel, addcomment } from "../db/add.js";

export async function createChannelController(req: Request, res: Response) {
  try {
    const link: string = createLink();
    const { name, img, backgraund } = req.body;
    const email = req.body.user.email;

    await addChannel([name, 0, link, img, backgraund, email]);
    res.send(JSON.stringify({ message: "Channel added." }));
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};

// export async function craeateCommentController(req: Request, res: Response) {
//   try {

//     addcomment([])
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Internal Server Error.");
//   }
// };