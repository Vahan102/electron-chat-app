import { createLink } from "../cryptography/crypto.js"
import { Request, Response } from "express";
import { addChannel, addChat, addcomment, addUserInGroup, joinGroup } from "../db/add.js";
import { getServerByLink, getUser, getUserByNameAndTag, getUserFromGroup, getUserInGroup } from "../db/get.js";
import { addFriend } from "../db/add.js";

export async function createServerController(req: Request, res: Response) {
  try {
    const link: string = createLink();
    const { name, img, backgraund } = req.body;
    const email = req.body.user.email;
    const user: any = await getUser(email)
    if (user.length > 0) {
      await joinGroup([email, link, "admin", name,img]);
      await addChannel([name, 0, link, img, backgraund, email]);
      res.send(JSON.stringify({ message: "Server added.", link:link, name:name }));
    } else {
      console.log(2)
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};


export async function joinGroupController(req: Request, res: Response) {
  try {
    const link = req.body.link;
    const email: string = req.body.user.email;
    const user: any = await getUser(email);
    const server: any = await getServerByLink(link);
    const userVerify: any = await getUserInGroup(link,email);
    
    
    if (user.length > 0 && server.length > 0 && userVerify.length == 0) {
      await joinGroup([email, req.body.link, "member",user[0].name, server[0].img]);
      res.send(JSON.stringify({ message: "You have successfully joined the group." }));
    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};

export async function addFriendController(req: Request, res: Response) {
  try {
    const email: string = req.body.user.email;
    const { name, tag } = req.body;
    const user: any = await getUserByNameAndTag(name, tag);
    if (user.length > 0) {
      await addFriend([name + tag, email]);
      res.send(JSON.stringify({ message: "You added a friend." }));
    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};

export async function addChatController(req: Request, res: Response) {
  try {
    const email1: string = req.body.user.email;
    const { email } = req.body;
    const link: string = createLink();
    const firstUser: any = await getUser(email1);
    const secondUser: any = await getUser(email)
    if (secondUser.length > 0 && firstUser.length > 0) {
      const result = await addChat([email1, email, link]);
      if (result == false) {
        res.status(400).send("Bad request.");
        return
      }
      res.send(JSON.stringify({ message: "You added a chat." }));
    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};


export async function addUserIngroupController(req: Request, res: Response) {
  try {
    const email1: string = req.body.user.email;
    let { email, link } = req.body;
    const user: any = await getUserFromGroup(link, email1);
    const secondUserVerify:any = await getUserFromGroup(link, email);
    const secondUser: any = await getUser(email);
    if (user.length > 0 && secondUser.length > 0 && secondUserVerify.length < 1) {
      await addUserInGroup([email, link, "member"]);
      res.send(JSON.stringify({ message: "User added to group." }));
    } else {
      res.status(400).send("Bad request.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  };
};