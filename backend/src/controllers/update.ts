import { Request, Response } from "express";
import { getSereversParametrs } from "../db/get.js";
import { verificationOfUser } from "../functions/functions.js";
import { updatedProfile, updateServer } from "../db/update.js";

export async function updateServerController(req: Request, res: Response) {
    try {
        const { email, password }: any = req.body.user;
        const link = req.body.link;
        const server = await getSereversParametrs(link);
        const userVerification = await verificationOfUser(email, password);
        if (Array.isArray(server)) {
            if (server.length > 0) {
                if (userVerification) {
                    await updateServer(link, req.body.updateoffer);
                    res.send(JSON.stringify({ message: "Server successfully updated." }));
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
    };
};


export async function updateProfileController(req: Request, res: Response) {
    try {
        const { email, password }: any = req.body.user;
        const userVerification = await verificationOfUser(email, password);

        if (userVerification) {
            await updatedProfile(req.body.updateoffer, email);
            res.send(JSON.stringify({ message: "Profile successfully updated." }));
        } else {
            res.status(400).send("Bad request.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    };
};