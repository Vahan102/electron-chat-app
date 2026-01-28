import { getRequest } from "../../requests/get.js";
import { sendRequest } from "../../requests/global.js";
import { createGroup } from "../group/group.js";

const addButton: Element = document.querySelector("#add");
const discoverButton: Element = document.querySelector("#discover");

const style: HTMLStyleElement = document.createElement("style");
const menu: HTMLElement = document.querySelector(".menu");
const token = localStorage.getItem("token");

let imagesArr = ["default-pfp-for-discord-txq6kevqhvi68op5.png",
    "default-pfp-for-discord-txq6kevqhvi68op51.png",
    "default-pfp-for-discord-txq6kevqhvi68op512.png",
    "default-pfp-for-discord-txq6kevqhvi68op5125.png"
]

let addCount: number = 0;
let discoverCount: number = 0;


addButton.addEventListener("click", () => {
    if (addCount == 0) {
        menu.innerHTML = "";
        addCount = 1;
        discoverCount = 0;
        style.textContent = `
        #add svg .icon-plus{
         fill: #fff;
        }
        #add .btn
        {
         border-radius: 1rem;
         background-color: #23a559;
        }`;

        document.head.append(style);
        const text = document.createElement("h1");
        text.innerText = "Add Group"

        const box = document.createElement("div");
        box.classList.add("box")

        const addGroupButton: HTMLButtonElement = document.createElement("button");
        addGroupButton.innerText = "Create group";
        addGroupButton.classList.add("addGroupButton");

        const searchGroupButton: HTMLButtonElement = document.createElement("button");
        searchGroupButton.innerText = "Search group";
        searchGroupButton.classList.add("searchGroupButton");

        box.appendChild(text);
        box.appendChild(addGroupButton);
        box.appendChild(searchGroupButton);


        menu.appendChild(box);


        addGroupButton.addEventListener("click", () => {
            box.innerHTML = "";

            const text = document.createElement("h1");
            const groupImageBox = document.createElement("div");
            const groupImage = document.createElement("img");
            const groupName = document.createElement("input") as HTMLInputElement;
            const createGroupButton = document.createElement("button");

            const num = Math.floor(Math.random() * 4);

            groupImage.src = `../../../../assets/${imagesArr[num]}`;
            text.innerText = "Create Group";
            groupName.placeholder = " Group name";
            createGroupButton.innerText = "Create";
            box.style.marginTop = "0%";

            groupImageBox.classList.add("groupImageBox");
            createGroupButton.classList.add("createGroupButton");


            box.appendChild(text);
            groupImageBox.appendChild(groupImage);
            box.appendChild(groupImageBox);
            box.appendChild(groupName);
            box.appendChild(createGroupButton);

            createGroupButton.addEventListener("click", async () => {
                return await sendRequest("createGroup", "POST", "createGroup", token, {
                    name: groupName.value,
                    img: imagesArr[num]
                }).then(async (res) => {
                    groupName.value = "";
                    console.log(res);
                    await createGroup(res.link, res.name, "external", imagesArr[num]);
                });
            });
        })
        searchGroupButton.addEventListener("click", () => {
            box.innerHTML = "";
            const text = document.createElement("h1");
            const groupName = document.createElement("input");
            const searchGroupButton = document.createElement("button");

            // box.classList.add("groupImageBox");
            searchGroupButton.classList.add("searchGroupButton2");

            text.innerText = "Search Group";
            groupName.placeholder = " Group link";
            searchGroupButton.innerText = "Search";

            box.appendChild(text);
            box.appendChild(groupName);
            box.appendChild(searchGroupButton);

            searchGroupButton.addEventListener("click", async () => {
                return await sendRequest("joinGroup", "POST", "joinGroup", token, {
                    link: groupName.value
                }).then(async (res) => {
                    getRequest("searchGroup", token, { link: groupName.value }).then(async (res) => {
                        console.log(res);
                        await createGroup(res.data[0].link, res.data[0].name, "internal", res.data[0].img);
                    })

                });
            });
        })

    } else if (addCount == 1) {
        style.textContent = `
        #add svg .icon-plus{
         fill: #23a559;
        }
       #add .btn
       {
        border-radius: 60px;
        background-color: #34363b;
       }`;
        document.head.append(style);
        menu.innerHTML = "";
        addCount = 0;
    }

});


//secondButton

discoverButton.addEventListener("click", () => {
    if (discoverCount == 0) {
        discoverCount = 1;
        addCount = 0;
        menu.innerHTML = "";
        style.textContent = `
   
        #discover .link
        {
         border-radius: 1rem;
         background-color: #23a559;
        }
        #discover a:not(.logo, .channel) svg circle {
           fill: #fff;
        }

        #discover a:not(.logo, .channel) svg .inner-circle {
          fill: #23a559;
        } 

       #add svg .icon-plus{
         fill: #23a559;
        }
       #add .btn
       {
        border-radius: 60px;
        background-color: #34363b;
       }`;


        document.head.append(style);
        const box = document.createElement("div");
        const text = document.createElement("h1");
        const groupName = document.createElement("input");
        const searchGroupButton = document.createElement("button");

        box.classList.add("box");
        searchGroupButton.classList.add("createGroupButton");

        text.innerText = "Search user";
        groupName.placeholder = " User name";
        searchGroupButton.innerText = "Search";

        box.appendChild(text);
        box.appendChild(groupName);
        box.appendChild(searchGroupButton);

        menu.appendChild(box);

        searchGroupButton.addEventListener("click", () => {
            getRequest("searchUser", token, {
                name: groupName.value
            }).then(async (res) => {
                console.log(res);
            })
        });

    } else if (discoverCount == 1) {
        menu.innerHTML = "";
        style.textContent = `
         #discover .link
        {
         border-radius: 1rem;
         background-color: #34363b;
        }
        #discover a:not(.logo, .channel) svg circle {
           fill: #23a559;
        }
        #discover a:not(.logo, .channel) svg .inner-circle {
          fill: #23a559;
        } `;
        document.head.append(style);
        discoverCount = 0;
    };
});