import express from "express";
import router from "./routers/index.js";
import http from "http";
import cors from "cors";
import { setupWebSocket } from "./routers/websocket.js";
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use("/", router);
setupWebSocket(server);
server.listen(3027, () => {
    console.log("start");
});
//# sourceMappingURL=main.js.map