import { WebSocketServer } from "ws";
import { closeConnect, upgradeWebSocket } from "./WSrouters/server.js";
import { parse } from "url";
import { addWbSRouter } from "./WSrouters/add.js";
import { deleteWBSRouter } from "./WSrouters/delete.js";
export function setupWebSocket(server) {
    const users = new Map();
    const wss = new WebSocketServer({ noServer: true });
    wss.on("connection", (ws, req) => {
        //error 
        const { pathname } = parse(req.url, true);
        console.log(req.socket.remoteAddress);
        ws.on("message", async (msg) => {
            console.log(pathname);
            switch (pathname) {
                case "/ws/add":
                    await addWbSRouter(msg, ws, users);
                    break;
                case "/ws/delete":
                    await deleteWBSRouter(msg, ws, users);
                    break;
                default:
                    ws.terminate();
                    break;
            }
        });
        ws.on("close", async () => { await closeConnect(ws, users); });
    });
    server.on("upgrade", async (req, socket, head) => { await upgradeWebSocket(req, socket, head, wss); });
}
;
//# sourceMappingURL=websocket.js.map