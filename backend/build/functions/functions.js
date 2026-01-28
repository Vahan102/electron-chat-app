import { generateToken } from "../cryptography/jwt.js";
import { userVerifi } from "../db/get.js";
import { sha256 } from "../cryptography/crypto.js";
import { getUser } from "../db/get.js";
import { verifyToken } from "../cryptography/jwt.js";
export function createSalt() {
    return Math.round(new Date().valueOf() * Math.random()).toString();
}
;
export async function createToken(email, password) {
    try {
        const userV = await verificationOfUser(email, password);
        if (userV) {
            const token = generateToken({ email, password });
            return token;
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function verificationToken(token) {
    try {
        const user = verifyToken(token);
        if (typeof user != "string" && typeof user != "boolean") {
            if ("email" in user) {
                return user;
            }
        }
        return false;
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function verificationOfUser(email, password) {
    try {
        const user = await getUser(email);
        console.log(user);
        if (Array.isArray(user)) {
            if ("solt" in user[0]) {
                const solt = user[0].solt;
                const hashPassword = sha256(password + solt);
                const userV = await userVerifi(email, hashPassword);
                if (userV == true) {
                    return true;
                }
                else {
                    return false;
                }
                ;
            }
            else {
                return false;
            }
        }
        else
            return false;
    }
    catch (err) {
        throw err;
    }
}
;
//# sourceMappingURL=functions.js.map