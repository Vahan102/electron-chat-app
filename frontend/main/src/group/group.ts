import { text } from "stream/consumers";
import { getRequest } from "../../requests/get.js";
import { sendRequest } from "../../requests/global.js";
import { sendInSocket } from "../../requests/websocket.js";
import { link } from "fs";


const token = localStorage.getItem("token");
const menu: HTMLElement = document.querySelector(".menu");
const pareatElement: Element = document.querySelector("ul");
const images = ["../../../../assets/default-pfp-for-discord-txq6kevqhvi68op512.png", "../../../../assets/default-pfp-for-discord-txq6kevqhvi68op5.png"]
const messegeBox = document.createElement("div");

export async function createGroup(link: string, name: string, type: string, imge: string) {
   const div = document.createElement("div")
   const li = document.createElement("li");
   const img = document.createElement("img");

   const span = document.createElement("span");
   li.classList.add("groupiconexternal");
   img.src = `../../../../assets/${imge}`;
   li.appendChild(img);
   img.classList.add("groupImg");
   span.classList.add("tooltip");
   span.innerText = name;
   div.appendChild(li)
   pareatElement.appendChild(div);
   li.appendChild(span);

   li.addEventListener("click", () => {
      clickTheServerIcon(link, name, imge);
   });
   li.addEventListener('touchstart', function (event) {
      console.log(link);
   });
};

getRequest("getUserServers", token, {

}).then((res) => {
   for (let i = 0; i < res.data.length; i++) {

      const div = document.createElement("div")
      const li = document.createElement("li");
      const span = document.createElement("span");


      li.classList.add("groupiconexternal");

      const img = document.createElement("img");
      img.src = `../../../../assets/${res.data[i].img}`;
      img.classList.add("groupImg");
      span.classList.add("tooltip");
      span.innerText = res.data[i].name;
      div.appendChild(li)
      pareatElement.appendChild(div);
      li.appendChild(span);
      li.appendChild(img);

      li.addEventListener("click", () => {
         clickTheServerIcon(res.data[i].link, res.data[i].name, res.data[i].img);
      });
      let isHover = false;


      li.addEventListener("mouseenter", () => {
         isHover = true;
      });


      li.addEventListener("mouseleave", () => {
         isHover = false;
      });
      document.addEventListener("keydown", (event) => {
         if (isHover && event.key === "Enter") {
            div.remove();
            sendRequest("deleteServer", "DELETE", "deleteServer", token,
               { link: res.data[i].link }).then((res) => {
                  console.log(res)
               })
         }
      });

   }
});


async function clickTheServerIcon(link: string, name: string, img: string) {

   const top = document.createElement("div");
   const groupIcon = document.createElement("img");
   const groupName = document.createElement("p");
   const callButton = document.createElement("button");

   callButton.innerHTML = ` <svg class="lasurt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.88 19.88 0 0 1 3 5.18 2 2 0 0 1 5 3h3a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.29 1.09l-1.5 1.5a16 16 0 0 0 6 6l1.5-1.5a1 1 0 0 1 1.09-.29l4 1a1 1 0 0 1 .75 1z"/>
    </svg>`
   groupName.classList.add("groupname");
   groupIcon.classList.add("groupmg");


   groupIcon.src = `../../../../assets/${img}`;
   groupName.innerText = name;

   getRequest("getGroupMesseges", token, { link: link }).then((res) => {
      console.log(res)
      messegeBox.innerHTML = "";

      for (let i = 0; i < res.data.length; i++) {

         const div = document.createElement("div");
         const img = document.createElement("img");
         const body = document.createElement("div");
         const p = document.createElement("p");

         div.classList.add("messegebody");
         body.classList.add("fullmessegebody");
         img.classList.add("useravaterinmessege");

         p.innerText = res.data[i].text;
         img.src = images[0];


         div.appendChild(p);
         body.appendChild(div);
         body.appendChild(img);
         messegeBox.appendChild(body);
         menu.appendChild(messegeBox);
      }

   })

   const socket = new WebSocket("ws://localhost:3027/ws");

   socket.onmessage = (event) => {
      console.log(event)
   };

   socket.onerror = (err) => {
      console.log(err)
   };

   socket.onclose = () => {
      console.log("Connection closed");
   };


   const div = document.createElement("div");
   const button = document.createElement("button");
   const input = document.createElement("input");

   messegeBox.classList.add("messegebox")
   div.classList.add("contofmes");
   input.classList.add("messegeinput");
   div.classList.add("contofmes");
   top.classList.add("header")
   callButton.classList.add("callButton")

   menu.innerHTML = "";
   button.innerText = "Send";

   top.appendChild(groupIcon);
   top.appendChild(groupName);
   top.appendChild(callButton);

   menu.appendChild(top)
   menu.appendChild(messegeBox);
   div.appendChild(input);
   div.appendChild(button);
   menu.appendChild(div);

   callButton.addEventListener("click", () => {
      localStorage.setItem("link", link);
      window.api.openNewPage("../frontend/main/src/calls/call.html");
   })

   button.addEventListener("click", async () => {
      if (input.value != "") {
         sendInSocket(token, "addComment", `{"text":"${input.value}","link":"${link}","type":"sendInGroup"}`);
         createMessege(messegeBox, input.value, images[0]);
         input.value = "";
      }
   });
   document.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
         if (input.value != "") {
            sendInSocket(token, "addComment", `{"text":"${input.value}","link":"${link}","type":"sendInGroup"}`);
            createMessege(messegeBox, input.value, images[0]);
            input.value = "";
         }
      }
   });

}


function createMessege(box: any, value: string, src: string) {
   const div = document.createElement("div");
   const img = document.createElement("img");
   const body = document.createElement("div");
   const p = document.createElement("p");

   div.classList.add("messegebody");
   body.classList.add("fullmessegebody");
   img.classList.add("useravaterinmessege");

   p.innerText = value;
   img.src = src;

   div.appendChild(p);
   body.appendChild(div);
   body.appendChild(img);
   box.appendChild(body);
}