import { Request, Response } from "express";
import { getAdminServers, getFriends, getGroupMembers, getServerByLink, getServerMesseges, getUserByName, getUserServers } from "../db/get.js";
import { length } from "zod/v4";
import { link } from "fs";

const a:string = 5;

export async function getUserServersController(req: Request, res: Response) {
    try {
        const email: string = req.body.user.email;
        const servers: any = await getUserServers(email);
        if (servers.length > 0) {
            res.send(JSON.stringify({
                message: "Servers you’re in.",
                data: servers
            }));
        } else {
            res.status(500).send("Not Found.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    };
};

export async function getAdminServersController(req: Request, res: Response) {
    try {
        const email: string = req.body.user.email;
        const servers: any = await getAdminServers(email);
        if (servers.length > 0) {
            res.send(JSON.stringify({
                message: "Your servers.",
                data: servers
            }));
        } else {
            res.status(404).send("Not Found.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    };
};

export async function getUserByNameController(req: Request, res: Response) {
    try {
        const name: any = req.query.name;
        if (typeof name == "string") {
            const user: any = await getUserByName(name);
            console.log(name, user)
            if (user.length > 0) {
                res.send(JSON.stringify({
                    message: "User found.",
                    data: user
                }));
            } else {
                res.status(404).send("Not Found.");
            }
        } else {
            res.status(400).send("Bad request.");
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    };
};

export async function getServerByLinkController(req: Request, res: Response) {
    try {

        const link = req.query.link;
        if (typeof link != "string") {
            res.status(500).send("Not Found.");
            return;
        }
        const server: any = await getServerByLink(link);
        if (server.length > 0) {
            res.send(JSON.stringify({
                message: "Your servers.",
                data: server
            }));
        } else {

            res.status(404).send("Not Found.");
        }
    } catch (err) {

        console.log(err);
        res.status(500).send("Internal Server Error.");
    };
};


export async function getGroupMemebersController(req: Request, res: Response) {
    try {
        const link: string = req.body.link;
        const members: any = await getGroupMembers(link);
        if (members.lenght > 0) {
            res.send(JSON.stringify({
                message: "Group members.",
                data: members
            }));
        } else {
            res.status(404).send("Not Found.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    };
};

export async function getUserFriendController(req: Request, res: Response) {
    try {
        const email: string = req.body.user.email;
        const friends: any = await getFriends(email);
        if (friends.lenght > 0) {
            res.send(JSON.stringify({
                message: "User friends.",
                data: friends
            }));
        } else {
            res.status(404).send("Not Found.");
        };
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    };
};


export async function getServerMessegesCotroller(req: Request, res: Response) {
    try {
        const link = req.query.link;
        if (typeof link == "string") {
            const messages = await getServerMesseges(link);
            res.send(JSON.stringify({
                message: "Group Messeges.",
                data: messages
            }));
        } else {
            res.status(404).send("Not Found.");
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
}