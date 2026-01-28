import { sendRequest } from "../../../requests/global.js";


const value = localStorage.getItem("token");

if (value !== null) {
    window.api.openNewPage("../frontend/main/src/menu/menu.html");
}


const loginButton: Element = document.querySelector(".link");
const nextButton: Element = document.querySelector(".btn");

//inputs
const nameInput = document.querySelector("#name") as HTMLInputElement;
const surnameInput = document.querySelector("#surname") as HTMLInputElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;

console.log(window.api);

loginButton.addEventListener("click", () => {
    window.api.openNewPage("../frontend/main/src/authentication/login/login.html")
});


nextButton.addEventListener("click", async () => {
    return await sendRequest("registration", "POST", "registration","", {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }).then((res) => {
        console.log(res)
        window.api.openNewPage("../frontend/main/src/authentication/login/login.html")
    });
});