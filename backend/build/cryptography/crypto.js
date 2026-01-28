import crypto from "crypto";
export function sha256(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
}
;
export function createLink() {
    const link = crypto.randomBytes(32).toString('hex');
    return link;
}
;
export function createTag() {
    const bytes = crypto.randomBytes(4);
    const digits = Array.from(bytes, b => (b % 10).toString()).join('');
    return digits.slice(0, 4);
}
;
//# sourceMappingURL=crypto.js.map