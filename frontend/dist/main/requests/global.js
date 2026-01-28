var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const pathObj = {
    registration: "http://localhost:3027/authentication/registration",
    login: "http://localhost:3027/authentication/login",
    createGroup: "http://localhost:3027/add/createserver",
    joinGroup: "http://localhost:3027/add/joingroup",
    deleteServer: "http://localhost:3027/delete//deleteserver"
};
export function sendRequest(path, method, type, token, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = pathObj[path];
            const response = yield fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "authentication": `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });
            if (!response.ok)
                throw new Error(`Server error: ${response.status}`);
            const data = yield response.json();
            console.log("Server response:", data);
            return data;
        }
        catch (err) {
            console.error("Request error:", err);
        }
    });
}
