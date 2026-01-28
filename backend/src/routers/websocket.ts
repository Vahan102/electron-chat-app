import { WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { closeConnect, upgradeWebSocket } from "./WSrouters/server.js";
import { parse } from "url";
import { addWbSRouter } from "./WSrouters/add.js";
import { deleteWBSRouter } from "./WSrouters/delete.js";
import { verificationToken } from "../functions/functions.js";


export function setupWebSocket(server: HttpServer) {
  const users = new Map()

  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", async (ws, req) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    if (typeof token == "string") {
      const user = await verificationToken(token);
      if (user != false) {
        users.set(user.email, ws);
      } else {
        ws.terminate();
      }
    } else {
      ws.terminate();
    }
    //error 
    
    const { pathname } = parse(req.url!, true);
    // console.log(req.socket.remoteAddress);
    ws.on("message", async (msg) => {
      switch (pathname) {
        case "/ws/add":
          
          await addWbSRouter(msg, ws, users)
          break;

        case "/ws/delete":
          await deleteWBSRouter(msg, ws, users)
          break;

        default:
          ws.terminate();
          break;
      }
    });

    ws.on("close", async () => { await closeConnect(ws, users); });
  });
  server.on("upgrade", async (req, socket, head) => { await upgradeWebSocket(req, socket, head, wss) });
};