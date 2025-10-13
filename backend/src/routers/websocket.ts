import { WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { closeConnect, upgradeWebSocket } from "./WSrouters/server.js";
import { parse } from "url";
import { addWbSRouter } from "./WSrouters/add.js";
import { deleteWBSRouter } from "./WSrouters/delete.js";


export function setupWebSocket(server: HttpServer) {
  const users = new Map()

  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (ws, req) => {

    const { pathname, query } = parse(req.url!, true);

    console.log(req.socket.remoteAddress);
    ws.on("message", async (msg) => {
      switch (pathname) {
        case "/add":
          await addWbSRouter(msg, ws, users)
          break;

        case "/delete":
          await deleteWBSRouter(msg,ws,users)
          break;

        default:
          break;
      }
    });

    ws.on("close", async () => { await closeConnect(ws, users); });
  });
  server.on("upgrade", async (req, socket, head) => { await upgradeWebSocket(req, socket, head, wss) });
};