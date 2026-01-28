import { Request, Response } from "express";
import { getSereversParametrs, getServerByLink, getUser } from "../db/get.js";
import { verificationOfUser } from "../functions/functions.js";
import { deleteChat, deleteFriend, deleteServer, deleteServerFromMembers, deleteUserFromChat, leaveGroup } from "../db/delete.js";

export async function deleteServerController(req: Request, res: Response) {
  try {
    const { email, password }: any = req.body.user;
    const link = req.body.link;
    
    const server = await getSereversParametrs(link);
    console.log(server)
    const userVerification = await verificationOfUser(email, password);
    if (Array.isArray(server)) {
      if (server.length > 0) {
        if (userVerification) {
          await deleteServer(link);
          await deleteServerFromMembers(link);
          res.send(JSON.stringify({ message: "Server successfully deleted." }));
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


export async function leaveGroupController(req: Request, res: Response) {
  try {
    const { email, password }: any = req.body.user;
    const link: string = req.body.link
    const resultOfDelete = await leaveGroup(email,link);
    const userVerification = await verificationOfUser(email, password);
    if (resultOfDelete) {
      if (userVerification) {
        res.send(JSON.stringify({ message: "You've left the group." }));
      } else {
        res.status(400).send("Bad request.");
      }

    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};

export async function deleteFriendController(req: Request, res: Response) {
  try {
    const { email, password }: any = req.body.user;
    const name: string = req.body.name;
    const resultOfDelete = await deleteFriend(name, email);
    const userVerification = await verificationOfUser(email, password);
    if (resultOfDelete) {
      if (userVerification) {
        res.send(JSON.stringify({ message: "You've deleted your friend." }));
      } else {
        res.status(400).send("Bad request.");
      }

    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};


export async function deleteChatController(req: Request, res: Response) {
  try {
    const { email, password }: any = req.body.user;
    const link: string = req.body.name;
    const resultOfDelete = await deleteChat(email, link);
    const userVerification = await verificationOfUser(email, password);
    if (resultOfDelete) {
      if (userVerification) {
        res.send(JSON.stringify({ message: "You've deleted chat." }));
      } else {
        res.status(400).send("Bad request.");
      }

    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};




export async function deleteUserFromGroupController(req: Request, res: Response) {
  try {
    const email1: string = req.body.user.email;
    let { email, link } = req.body
    const server: any = await getServerByLink(link);
    const user: any = await getUser(email)
    console.log(user)
    if (server[0].admin == email1 && user.length > 0) {
      await deleteUserFromChat(link, email);
      res.send(JSON.stringify({ message: "You've deleted the user from this group." }));
    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};