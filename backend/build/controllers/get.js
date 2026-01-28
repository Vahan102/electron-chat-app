import { getAdminServers, getFriends, getGroupMembers, getServerByLink, getUserByName, getUserServers } from "../db/get.js";
export async function getUserServersController(req, res) {
    try {
        const email = req.body.user.email;
        const servers = await getUserServers(email);
        if (servers.lenght > 0) {
            res.send(JSON.stringify({
                message: "Servers you’re in.",
                data: servers
            }));
        }
        else {
            res.status(500).send("Not Found.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function getAdminServersController(req, res) {
    try {
        const email = req.body.user.email;
        const servers = await getAdminServers(email);
        if (servers.lenght > 0) {
            res.send(JSON.stringify({
                message: "Your servers.",
                data: servers
            }));
        }
        else {
            res.status(500).send("Not Found.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function getUserByNameController(req, res) {
    try {
        const name = req.body.name;
        const user = await getUserByName(name);
        if (user.lenght > 0) {
            res.send(JSON.stringify({
                message: "User found.",
                data: user
            }));
        }
        else {
            res.status(500).send("Not Found.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function getServerByLinkController(req, res) {
    try {
        const link = req.query.link;
        if (typeof link != "string") {
            res.status(500).send("Not Found.");
            return;
        }
        const server = await getServerByLink(link);
        if (server.length > 0) {
            res.send(JSON.stringify({
                message: "Your servers.",
                data: server
            }));
        }
        else {
            res.status(500).send("Not Found.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function getGroupMemebersController(req, res) {
    try {
        const link = req.body.link;
        const members = await getGroupMembers(link);
        if (members.lenght > 0) {
            res.send(JSON.stringify({
                message: "Group members.",
                data: members
            }));
        }
        else {
            res.status(500).send("Not Found.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
export async function getUserFriendController(req, res) {
    try {
        const email = req.body.user.email;
        const friends = await getFriends(email);
        if (friends.lenght > 0) {
            res.send(JSON.stringify({
                message: "User friends.",
                data: friends
            }));
        }
        else {
            res.status(500).send("Not Found.");
        }
        ;
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
//# sourceMappingURL=get.js.map