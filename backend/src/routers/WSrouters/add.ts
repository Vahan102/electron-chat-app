import WebSocket from "ws";
import { getUser } from "../../db/get.js";
import { addcommentInDiscordServer, addMessege } from "../../db/add.js";
import { getGroupMembers } from "../../db/get.js";
import wrtc from "wrtc";

interface WSWithPC extends WebSocket {
    pc?: any;
}


export async function addWbSRouter(msg: any, ws: WSWithPC, users: any) {
    try {

        msg = JSON.parse(msg.toString("utf8"))

        if ("type" in msg) {

            if (msg.type == "send") await sendMsg(msg, ws, users);
            else if (msg.type == "sendInGroup") await sendInGroup(msg, ws, users);
            if (msg.type === "sendSPD") {
                await sendSPD(ws, msg, users);
            }

            if (msg.type === "iceCandidateFromClient") {
                if ("pc" in ws) {
                    await ws.pc.addIceCandidate(msg.candidate);
                }
            }
        } else {
            console.log(msg)
            ws.send(JSON.stringify({ messege: "Insufficient information provided.." }));
        }
    } catch (err) {
        throw err
    }
};



export async function sendMsg(msg: any, ws: WebSocket, users: Map<any, any>) {
    try {
        let user;
        if (typeof msg.email == "string") {
            user = await getUser(msg.email);
            if (Array.isArray(user)) {
                if ("email" in user[0] && typeof msg.img == "string" && typeof msg.text == "string") {
                    await addMessege([msg.email, msg.text, msg.email, msg.img]);

                    const targetSocket = users.get(msg.email);
                    if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
                        targetSocket.send(JSON.stringify({
                            type: "add",
                            from: user[0].email,
                            text: msg.text
                        }));
                    } else {
                        ws.send(JSON.stringify({ error: "Server can't find a user in websocket server." }));
                    };
                }
                return;
            }
        }
        ws.send(JSON.stringify({ error: "You provided incorrect information." }));
    } catch (err) {
        console.log(err);
        throw err
    }
};


export async function sendInGroup(msg: any, ws: WebSocket, users: Map<any, any>) {
    try {
     
        if (typeof msg.link !== "string") {
            ws.send(JSON.stringify({ error: "You provided incorrect information." }));
            return;
        }


        // await addMessege([msg.email, msg.text, msg.groupId, msg.img]);
        await addcommentInDiscordServer([Array.from(users.keys()).pop(), msg.text, msg.link]);

        const groupMembers = await getGroupMembers(msg.link);

        if (Array.isArray(groupMembers)) {
            groupMembers.forEach(email => {
                const targetSocket = users.get(email);
                if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
                    targetSocket.send(JSON.stringify({
                        text: msg.text,
                        img: msg.img,
                        groupId: msg.groupId
                    }));
                }
            });
        }



    } catch (err) {
        console.log(err);
        ws.send(JSON.stringify({ error: "Server error." }));
    }
};

export async function sendSPD(ws: any, msg: any, users: Map<any, any>) {
    try {
      
        if (!msg.link) return; 

        
        const groupMembers: any = await getGroupMembers(msg.link);
        
        if (!Array.isArray(groupMembers) || groupMembers.length < 2) {
            // console.log("Not enough members for P2P");
            return;
        }

       
        let targetSocket = null;

        for (const member of groupMembers) {
           
            const sock = users.get(member.email);

            if (sock && sock.readyState === WebSocket.OPEN && sock !== ws) {
                targetSocket = sock;
                break;
            }
        }

        if (!targetSocket) {
            console.log("Partner offline or not found.");
            return;
        }

     
        if (msg.type2 === "iceCandidateFromClient") {
            targetSocket.send(JSON.stringify({
                type: "iceCandidateFromServer",
                candidate: msg.candidate
            }));
        }

     
        if (msg.type2 === "sendSPD" && msg.sdp) {
     
            if (msg.sdp.type === "offer") {
                targetSocket.send(JSON.stringify({
                    type: "offerForSPD",
                    sdp: msg.sdp
                }));
            } 
           
            else if (msg.sdp.type === "answer") {
                targetSocket.send(JSON.stringify({
                    type: "answerForSPD", 
                    sdp: msg.sdp
                }));
            }
        }

    } catch (err) {
        console.error("SPD Error:", err);
    }
}

// export async function answerForSPD(ws: WebSocket) {
//     try {

//         ws.send("")
//     } catch (err) {
//         console.log(err);
//         throw err
//     }
// };