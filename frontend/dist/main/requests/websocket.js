var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const pathObj = {
    addComment: "ws://localhost:3027/ws/add",
    sendSpd: "ws://localhost:3027/ws/add"
};
export function sendInSocket(token, path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const socket = new WebSocket(pathObj[path] + `?token=${token}`);
            socket.onopen = () => {
                socket.send(body);
                socket.close();
            };
            // socket.close();
        }
        catch (err) {
            console.error("Request error:", err);
        }
    });
}
;
export function createSocket(token, path) {
    return new WebSocket(pathObj[path] + `?token=${token}`);
}
