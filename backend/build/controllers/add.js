import { createLink } from "../cryptography/crypto.js";
import { addChannel, addChat, addUserInGroup, joinGroup } from "../db/add.js";
import { getServerByLink, getUser, getUserByNameAndTag, getUserFromGroup, getUserInGroup } from "../db/get.js";
import { addFriend } from "../db/add.js";
export async function createServerController(req, res) {
    try {
        const link = createLink();
        const { name, img, backgraund } = req.body;
        const email = req.body.user.email;
        console.log(email);
        const user = await getUser(email);
        if (user.length > 0) {
            await joinGroup([email, link, "admin"]);
            await addChannel([name, 0, link, img, backgraund, email]);
            res.send(JSON.stringify({ message: "Server added." }));
        }
        else {
            console.log(2);
            res.status(400).send("Bad request.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function joinGroupController(req, res) {
    try {
        const link = req.body.link;
        const email = req.body.user.email;
        const user = await getUser(email);
        const server = await getServerByLink(link);
        const userVerify = await getUserInGroup(link, email);
        if (user.length > 0 && server.length > 0 && userVerify.length == 0) {
            await joinGroup([email, req.body.link, "member"]);
            res.send(JSON.stringify({ message: "You have successfully joined the group." }));
        }
        else {
            res.status(400).send("Bad request.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function addFriendController(req, res) {
    try {
        const email = req.body.user.email;
        const { name, tag } = req.body;
        const user = await getUserByNameAndTag(name, tag);
        if (user.length > 0) {
            await addFriend([name + tag, email]);
            res.send(JSON.stringify({ message: "You added a friend." }));
        }
        else {
            res.status(400).send("Bad request.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function addChatController(req, res) {
    try {
        const email1 = req.body.user.email;
        const { email } = req.body;
        const link = createLink();
        const firstUser = await getUser(email1);
        const secondUser = await getUser(email);
        if (secondUser.length > 0 && firstUser.length > 0) {
            const result = await addChat([email1, email, link]);
            if (result == false) {
                res.status(400).send("Bad request.");
                return;
            }
            res.send(JSON.stringify({ message: "You added a chat." }));
        }
        else {
            res.status(400).send("Bad request.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function addUserIngroupController(req, res) {
    try {
        const email1 = req.body.user.email;
        let { email, link } = req.body;
        const user = await getUserFromGroup(link, email1);
        const secondUserVerify = await getUserFromGroup(link, email);
        const secondUser = await getUser(email);
        if (user.length > 0 && secondUser.length > 0 && secondUserVerify.length < 1) {
            await addUserInGroup([email, link, "member"]);
            res.send(JSON.stringify({ message: "User added to group." }));
        }
        else {
            res.status(400).send("Bad request.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
//# sourceMappingURL=add.js.map