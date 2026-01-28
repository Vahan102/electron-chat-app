var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pathObj = {
    searchGroup: "http://localhost:3027/get/getserverbylink",
    searchUser: "http://localhost:3027/get/getuserbyname",
    getUserServers: "http://localhost:3027/get/getuserservers",
    getGroupMesseges: "http://localhost:3027/get//getservermesseges"
};
export function getRequest(path, token, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = pathObj[path];
            if (params) {
                const query = new URLSearchParams(params);
                url += "?" + query.toString();
            }
            const response = yield fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authentication": `Bearer ${token}`
                },
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
