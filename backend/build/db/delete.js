import { pool } from "./pool.js";
export async function deleteServer(link) {
    try {
        await pool.query(`DELETE FROM servers WHERE link = ?`, [link]);
        return true;
    }
    catch (err) {
        throw err;
    }
}
;
export async function leaveGroup(email, link) {
    try {
        const [result] = await pool.query(`DELETE FROM members WHERE email = ? AND link = ?`, [email]);
        if (result.affectedRows > 0) {
            return true;
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
export async function deleteFriend(email, name) {
    try {
        const [result] = await pool.query(`DELETE FROM friends WHERE name = ? AND touser = ?`, [name, email]);
        if (result.affectedRows > 0) {
            return true;
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
export async function deleteChat(email, link) {
    try {
        const [result] = await pool.query(`DELETE FROM chats WHERE link = ? AND (email1 = ? OR email2 = ?)`, [link, email]);
        if (result.affectedRows > 0) {
            return true;
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
export async function deleteUserFromChat(link, email) {
    try {
        const [result] = await pool.query(`DELETE FROM members WHERE link = ? AND email = ?`, [link, email]);
        if (result.affectedRows > 0) {
            return true;
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
export async function deleteMessege() {
}
//# sourceMappingURL=delete.js.map