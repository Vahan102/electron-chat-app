import { createSalt, createToken } from "../functions/functions.js";
import { createTag, sha256 } from "../cryptography/crypto.js";
import { getUser } from "../db/get.js";
import { addUser } from "../db/add.js";
export async function registrationController(req, res) {
    try {
        console.log(1);
        const { name, surname, email, password, avatar } = req.body;
        const tag = "#" + createTag();
        const user = await getUser(email);
        if (user == undefined) {
            res.status(409).send("Sorry,but this email is already taken.");
            return;
        }
        const solt = createSalt();
        const hashPassword = sha256(password + solt);
        await addUser([name, email, avatar, surname, solt, hashPassword, tag]);
        res.send(JSON.stringify({ message: "User added." }));
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
}
export async function loginController(req, res) {
    try {
        if (typeof req.body.email == "string" && typeof req.body.password == "string") {
            const token = await createToken(req.body.email, req.body.password);
            if (typeof token == "string") {
                res.send(JSON.stringify({ token: token }));
            }
            else {
                console.log(token);
                res.status(404).send("Not Found.");
            }
        }
        else {
            res.status(400).json({
                message: "Validation failed."
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
}
//# sourceMappingURL=authentication.js.map