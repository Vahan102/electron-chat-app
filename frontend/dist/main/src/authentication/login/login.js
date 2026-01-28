var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendRequest } from "../../../requests/global.js";
const linkButton = document.querySelector(".link");
const nextButton = document.querySelector(".btn");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
linkButton.addEventListener("click", () => {
    window.api.openNewPage("../frontend/main/src/authentication/registration/registration.html");
});
nextButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    return yield sendRequest("login", "POST", "login", "", {
        email: emailInput.value,
        password: passwordInput.value
    }).then((res) => {
        localStorage.setItem("token", res.token);
        window.api.openNewPage("../frontend/main/src/menu/menu.html");
    });
}));
