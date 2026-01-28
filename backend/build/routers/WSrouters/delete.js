import WebSocket from "ws";
import { verificationToken } from "../../functions/functions.js";
import { getUser } from "../../db/get.js";
import { deleteMessege } from "../../db/delete.js";
export async function deleteWBSRouter(msg, ws, users) {
    try {
        const user = await verificationToken(msg.token);
        if (user != false) {
            users.set(user.email, ws);
            if (msg.type == "deletedMsg")
                await deleteMsg(msg, ws, users);
        }
        else
            ws.terminate();
    }
    catch (err) {
        throw err;
    }
}
;
async function deleteMsg(msg, ws, users) {
    try {
        let user;
        if (typeof msg.email == "string") {
            user = await getUser(msg.email);
            if ("email" in user && typeof msg.img == "string" && typeof msg.text == "string") {
                await deleteMessege("?");
                const targetSocket = users.get(msg.email);
                if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
                    targetSocket.send(JSON.stringify({
                        type: "delete",
                        from: user.email,
                        text: msg.text
                    }));
                }
                else {
                    ws.send(JSON.stringify({ error: "Server can't find a user in websocket server." }));
                }
                ;
            }
        }
        ws.send(JSON.stringify({ error: "You provided incorrect information." }));
    }
    catch (err) {
        throw err;
    }
    ;
}
;
//# sourceMappingURL=delete.js.map