import { sendRequest } from "../../../requests/global.js";

const linkButton:Element = document.querySelector(".link");
const nextButton:Element = document.querySelector(".btn");
const emailInput= document.querySelector("#email") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;

linkButton.addEventListener("click",()=>{
    window.api.openNewPage("../frontend/main/src/authentication/registration/registration.html");
});


nextButton.addEventListener("click",async ()=>{
   return await sendRequest("login","POST","login","", {
       email: emailInput.value,
       password: passwordInput.value
   }).then((res) => {
      localStorage.setItem("token", res.token);
      window.api.openNewPage("../frontend/main/src/menu/menu.html");
    });
});