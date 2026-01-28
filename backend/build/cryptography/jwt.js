import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET || "");
}
;
export function verifyToken(token) {
    try {
        // console.log(token)
        return jwt.verify(token, process.env.JWT_SECRET || "");
    }
    catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
}
//# sourceMappingURL=jwt.js.map