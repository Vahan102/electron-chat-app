import { pool } from "./pool.js";
export async function getUser(email) {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return user[0];
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function userVerifi(email, password) {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password]);
        if (Array.isArray(user[0])) {
            if ("email" in user[0][0]) {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function getUserFromGroup(link, email) {
    try {
        const user = await pool.query(`SELECT * FROM members WHERE link = ? AND email = ?`, [link, email]);
        return user[0];
    }
    catch (err) {
        throw err;
    }
}
;
export async function getSereversParametrs(link) {
    try {
        const server = await pool.query(`SELECT * FROM servers WHERE link = ?`, [link]);
        return server[0];
    }
    catch (err) {
        throw err;
    }
}
;
export async function getUserServers(email) {
    try {
        const servers = await pool.query(`SELECT * FROM members WHERE email = ?`, [email]);
        return servers[0];
    }
    catch (err) {
        throw err;
    }
}
;
export async function getAdminServers(email) {
    try {
        const servers = await pool.query(`SELECT * FROM servers WHERE admin = ?`, [email]);
        return servers[0];
    }
    catch (err) {
        throw err;
    }
}
;
export async function getUserByName(name) {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE name = ?`, [name]);
        return user[0];
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function getServerByLink(link) {
    try {
        console.log(link);
        const server = await pool.query(`SELECT * FROM servers WHERE link = ?`, [link]);
        console.log(server[0]);
        return server[0];
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function getGroupMembers(link) {
    try {
        const members = await pool.query(`SELECT * FROM members WHERE link = ?`, [link]);
        return members[0];
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function getUserInGroup(link, email) {
    try {
        const user = await pool.query(`SELECT * FROM members WHERE link = ? AND email = ?`, [link, email]);
        return user[0];
    }
    catch (err) {
        throw err;
    }
    ;
}
export async function getUserByNameAndTag(name, tag) {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE name = ? AND tag = ?`, [name, tag]);
        return user[0];
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function getFriends(email) {
    try {
        const friends = await pool.query(`SELECT * FROM friends WHERE touser = ?`, [email]);
        return friends[0];
    }
    catch (err) {
        throw err;
    }
    ;
}
;
//# sourceMappingURL=get.js.map