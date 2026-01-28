// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     .then(stream => {
//         const cam = document.getElementById("cam");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
hangBtn.addEventListener("click", () => {
    window.api2.close();
});
const socket = createSocket(token, "sendSpd");
let pc;
socket.onopen = () => {
    console.log("WebSocket connected. Starting init...");
    init();
};
socket.onmessage = (ev) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msg = JSON.parse(ev.data);
        if (!pc)
            yield init();
        if (msg.type === "offerForSPD") {
            if (pc.signalingState !== "stable") {
                console.warn("⚠ Collision detected. Rolling back local offer.");
                yield pc.setLocalDescription({ type: "rollback" });
            }
            yield pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            const answer = yield pc.createAnswer();
            yield pc.setLocalDescription(answer);
            socket.send(JSON.stringify({
                type: "sendSPD",
                type2: "sendSPD",
                link,
                sdp: answer
            }));
        }
        if (msg.type === "answerForSPD") {
            if (pc.signalingState !== "stable") {
                yield pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            }
        }
        if (msg.type === "iceCandidateFromServer" && msg.candidate) {
            pc.addIceCandidate(msg.candidate).catch(e => { });
        }
    }
    catch (e) {
        console.error("Socket handler error:", e);
    }
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        if (pc)
            return;
        console.log("Creating RTCPeerConnection...");
        pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });
        let stream;
        try {
            stream = yield navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        }
        catch (err) {
            console.warn("CAMERA BUSY OR NOT FOUND! Switching to Fake Canvas Stream.");
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 300;
            canvas.height = 300;
            setInterval(() => {
                ctx.fillStyle = ctx.fillStyle === "darkred" ? "blue" : "darkred";
                ctx.fillRect(0, 0, 300, 300);
                ctx.fillStyle = "white";
                ctx.font = "24px Arial";
                ctx.fillText("Fake Stream", 80, 150);
            }, 500);
            stream = canvas.captureStream(30);
            const audioCtx = new AudioContext();
            const dest = audioCtx.createMediaStreamDestination();
            stream.addTrack(dest.stream.getAudioTracks()[0]);
        }
        const myVideo = document.getElementById("myVideo");
        if (myVideo)
            myVideo.srcObject = stream;
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        pc.ontrack = (ev) => {
            const remoteVideo = document.getElementById("remoteVideo");
            if (remoteVideo)
                remoteVideo.srcObject = ev.streams[0];
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
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (pc.signalingState === "stable") {
                console.log("Nobody called me. I am calling now...");
                const offer = yield pc.createOffer();
                yield pc.setLocalDescription(offer);
                socket.send(JSON.stringify({
                    type: "sendSPD",
                    type2: "sendSPD",
                    link,
                    sdp: offer
                }));
            }
        }), Math.random() * 2000 + 1000);
    });
}
