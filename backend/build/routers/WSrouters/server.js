export async function closeConnect(ws, users) {
    try {
        users.forEach((socket, email) => {
            if (socket === ws)
                users.delete(email);
        });
        console.log("client closed the window.");
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
;
export async function upgradeWebSocket(req, socket, head, wss) {
    try {
        const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
        if (pathname === "/ws/add" || pathname === "/ws/delete") {
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit("connection", ws, req);
            });
        }
        else if (pathname === "/ws") {
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit("connection", ws, req);
            });
        }
        else {
            socket.destroy();
        }
    }
    catch (err) {
        console.error(err);
        socket.destroy();
    }
}
// export async function upgradeWebSocket(req: IncomingMessage,socket: Stream.Duplex,head: Buffer<ArrayBufferLike>,wss: Server<typeof WebSocket, typeof IncomingMessage>) {
//   try {
//     const { pathname } = parse(req.url || "");
//         if (pathname === "/ws") {
//           wss.handleUpgrade(req, socket, head, (ws) => {
//             wss.emit("connection", ws, req);
//           });
//         } else {
//           socket.destroy();
//         }
//   } catch (err) {
//     throw err
//   }
// }
//# sourceMappingURL=server.js.map