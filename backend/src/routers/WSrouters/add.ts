import WebSocket from "ws";
import wrtc from "wrtc"
import { verificationToken } from "../../functions/functions.js";
import { getUser } from "../../db/get.js";
import { addMessege } from "../../db/add.js";


export async function addWbSRouter(msg: any, ws: WebSocket,users:any) {
    try {
        if ("type" in msg && "token" in msg && "email" in msg && "text" in msg && "img" in msg && typeof msg.token == "string") {
            const user = await verificationToken(msg.token);
            if (user != false) {
                users.set(user.email, ws);
                if (msg.type == "send") await sendMsg(msg, ws, users);
                else if (msg.type == "sendSPD") await sendSPD(ws, msg);
                else if (msg.type == "answerForSPD") await answerForSPD(ws);
            } else ws.terminate();
        }
    } catch (err) {
        throw err
    }
};



export async function sendMsg(msg: any, ws: WebSocket, users:Map<any, any>) {
    try {
        let user;
        if (typeof msg.email == "string") {
            user = await getUser(msg.email);
            if ("email" in user && typeof msg.img == "string" && typeof msg.text == "string") {

                await addMessege([msg.email, msg.text, msg.email, msg.img]);

                const targetSocket = users.get(msg.email);
                if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
                    targetSocket.send(JSON.stringify({
                        type: "add",
                        from: user.email,
                        text: msg.text
                    }));
                } else {
                    ws.send(JSON.stringify({ error: "Server can't find a user in websocket server." }));
                };
            }
        }
        ws.send(JSON.stringify({ error: "You provided incorrect information." }));
    } catch (err) {
        console.log(err);
        throw err
    }
};




export async function sendSPD(ws: WebSocket,msg:any) {
    try {
        const peerConnection = new wrtc.RTCPeerConnection();

        peerConnection.ondatachannel = (event: { channel: any; }) => {
            const channel = event.channel;
            channel.onmessage = (e: { data: any; }) => console.log("Received:", e.data);
            channel.onopen = () => console.log("Data channel open");
        };

        await peerConnection.setRemoteDescription({ type: "offer", sdp: msg.sdp });

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        ws.send(JSON.stringify({
            type: "answerForSPD",
            sdp: answer.sdp
        }));
    } catch (err) {
        console.log(err);
        throw err
    }
};

export async function answerForSPD(ws: WebSocket) {
    try {

        ws.send("")
    } catch (err) {
        console.log(err);
        throw err
    }
};