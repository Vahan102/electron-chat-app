import { verifyToken } from "../cryptography/jwt.js";
export async function verificationToken(req, res, next) {
    try {
        const authentication = req.headers["authentication"];
        console.log(authentication);
        if (typeof authentication == "string") {
            const token = authentication.split(" ")[1];
            const verifytoken = verifyToken(token);
            console.log(verifytoken);
            if (typeof verifytoken != "boolean" && typeof verifytoken == "object") {
                if ("email" in verifytoken && "password" in verifytoken) {
                    let userObj = { password: verifytoken.password, email: verifytoken.email };
                    req.body.user = userObj;
                    console.log(req.body);
                    next();
                    return;
                }
            }
            else {
                res.status(400).send("The server cannot process the request.");
            }
            ;
        }
        else {
            res.status(400).send("The server cannot process the request.");
        }
        ;
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
//# sourceMappingURL=verification.js.map