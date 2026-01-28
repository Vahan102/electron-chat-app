import { Request, Response, NextFunction } from "express";

export async function updateOffer(req: Request, res: Response, next: NextFunction) {
    try {
        const keys: string[] = Object.keys(req.body);
        let offers: any[] = []
        for (let i = 0; i < keys.length; i++) {
          offers.push(`${keys[i]} = ?`);
        };
        let textOffer:string = offers.join(" ");
        req.body.updateoffer = textOffer;
        next();
        return;
    } catch (err) {
        res.status(500).send("Internal Server Error.");
    };
};