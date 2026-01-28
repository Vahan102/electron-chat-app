

// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     .then(stream => {
//         const cam = document.getElementById("cam");

//         if (cam instanceof HTMLVideoElement) {
//             cam.srcObject = stream;
//         } else {
//             console.error("Element #cam is not a video element");
//         }
//     });
import { createSocket } from "../../requests/websocket.js";

const token = localStorage.getItem("token");
const link = localStorage.getItem("link");


const hangBtn = document.querySelector("#hangBtn");

hangBtn.addEventListener("click",()=>{
     window.api2.close()
})

const socket = createSocket(token, "sendSpd");

let pc: RTCPeerConnection;

socket.onopen = () => {
    console.log("WebSocket connected. Starting init...");
    init();
};

socket.onmessage = async (ev) => {
    try {
        const msg = JSON.parse(ev.data);

        if (!pc) await init();

       
        if (msg.type === "offerForSPD") {
            
            if (pc.signalingState !== "stable") {
                 console.warn("⚠ Collision detected. Rolling back local offer.");
                 await pc.setLocalDescription({ type: "rollback" });
            }

            await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            
         
            socket.send(JSON.stringify({ 
                type: "sendSPD",      
                type2: "sendSPD",       
                link, 
                sdp: answer 
            }));
        }

        if (msg.type === "answerForSPD") {
            if (pc.signalingState !== "stable") {
                await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            }
        }

       
        
        if (msg.type === "iceCandidateFromServer" && msg.candidate) {
            
            pc.addIceCandidate(msg.candidate).catch(e => {});
        }

    } catch (e) { console.error("Socket handler error:", e); }
};

async function init() {
    if (pc) return; 

    console.log("Creating RTCPeerConnection...");

    pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    
    let stream;
    try {
       
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (err) {
        console.warn("CAMERA BUSY OR NOT FOUND! Switching to Fake Canvas Stream.");
        
       
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = 300; canvas.height = 300;
        
        
        setInterval(() => {
            ctx.fillStyle = ctx.fillStyle === "darkred" ? "blue" : "darkred";
            ctx.fillRect(0, 0, 300, 300);
            ctx.fillStyle = "white"; ctx.font = "24px Arial";
            ctx.fillText("Fake Stream", 80, 150);
        }, 500);
        
        stream = canvas.captureStream(30);
        
        
        const audioCtx = new AudioContext();
        const dest = audioCtx.createMediaStreamDestination();
        stream.addTrack(dest.stream.getAudioTracks()[0]);
    }

 
    const myVideo = document.getElementById("myVideo") as HTMLVideoElement;
    if(myVideo) myVideo.srcObject = stream;

   
    stream.getTracks().forEach((track: MediaStreamTrack) => pc.addTrack(track, stream));

    pc.ontrack = (ev) => {
        const remoteVideo = document.getElementById("remoteVideo") as HTMLVideoElement;
        if(remoteVideo) remoteVideo.srcObject = ev.streams[0];
    };

  
    pc.onicecandidate = (e) => {
        if (e.candidate) {
            socket.send(JSON.stringify({
                type: "sendSPD", 
                type2: "iceCandidateFromClient", 
                link, 
                candidate: e.candidate 
            }));
        }
    };

    
    setTimeout(async () => {
        
        if (pc.signalingState === "stable") {
            console.log("Nobody called me. I am calling now...");
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            
            socket.send(JSON.stringify({ 
                type: "sendSPD", 
                type2: "sendSPD", 
                link, 
                sdp: offer 
            }));
        }
    }, Math.random() * 2000 + 1000);
}