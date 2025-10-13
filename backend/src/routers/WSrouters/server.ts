import { IncomingMessage } from "http";
import Stream from "stream";
import { parse } from "url";
import wrtc from "wrtc"
import WebSocket, { Server } from "ws";
import { Server as HttpServer } from "http";

export async function closeConnect(ws:WebSocket,users:Map<any, any>) {
    try {
         users.forEach((socket, email) => {
        if (socket === ws) users.delete(email);
      });
      console.log("client closed the window.");
    } catch (err) {
        console.log(err);
        throw err
    }
};

export async function upgradeWebSocket(req: IncomingMessage,socket: Stream.Duplex,head: Buffer<ArrayBufferLike>,wss: Server<typeof WebSocket, typeof IncomingMessage>) {
  try {
    const { pathname } = parse(req.url || "");
        if (pathname === "/ws") {
          wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
          });
        } else {
          socket.destroy();
        }
  } catch (err) {
    throw err
  }
}