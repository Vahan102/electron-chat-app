
export const pathObj = {
    addComment: "ws://localhost:3027/ws/add",
    sendSpd:"ws://localhost:3027/ws/add"
};

export async function sendInSocket(
    token:string,
    path: string,
    body: any
) {
    try {
        const socket = new WebSocket(pathObj[path] + `?token=${token}`);
        socket.onopen = () => {
            socket.send(body);
            socket.close();
        };
        // socket.close();
    } catch (err) {
        console.error("Request error:", err);
    }
};






export function createSocket(token: string, path: string) {
    return new WebSocket(pathObj[path] + `?token=${token}`);
}
