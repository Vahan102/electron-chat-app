import { pool } from "./pool.js";
export async function updateServer(offer, email) {
    try {
        await pool.query(`UPDATE servers SET ${offer} WHERE admin = ${email};`);
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function updatedProfile(offer, email) {
    try {
        await pool.query(`UPDATE users SET ${offer} WHERE email = ${email};`);
    }
    catch (err) {
        throw err;
    }
    ;
}
;
//# sourceMappingURL=update.js.map