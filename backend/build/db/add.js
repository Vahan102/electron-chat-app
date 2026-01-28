import { pool } from "./pool.js";
export async function addChannel(arr) {
    try {
        await pool.query("INSERT INTO servers (name, userCount, link, img, backgraund, admin) VALUES (?, ?, ?, ?, ?, ?);", arr);
    }
    catch (err) {
        throw err;
    }
}
;
export async function addcomment(arr) {
    try {
        await pool.query("INSERT INTO comments (author, text, link) VALUES (?, ?, ?);", arr);
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export async function addMessege(parametrs) {
    try {
        await pool.query("INSERT INTO messages (postman, text, touser, img) VALUES (?, ?, ?, ?);", parametrs);
        return true;
    }
    catch (err) {
        throw err;
    }
}
;
export async function addUser(parametrs) {
    try {
        await pool.query("INSERT INTO users (name, email, avatar, surname, solt, password, tag) VALUES (?, ?, ?, ?, ?, ?, ?);", parametrs);
        return true;
    }
    catch (err) {
        throw err;
    }
}
;
export async function joinGroup(parametrs) {
    try {
        await pool.query("INSERT INTO members (email, link, status) VALUES (?, ?, ?);", parametrs);
        return true;
    }
    catch (err) {
        throw err;
    }
}
;
export async function addFriend(parametrs) {
    try {
        await pool.query("INSERT INTO friends (name,touser) VALUES (?, ?);", parametrs);
    }
    catch (err) {
        throw err;
    }
}
;
export async function addChat(parametrs) {
    try {
        await pool.query("INSERT INTO chats (email1,email2,link) VALUES (?, ?, ?);", parametrs);
    }
    catch (err) {
        return false;
    }
}
;
export async function addUserInGroup(parametrs) {
    try {
        await pool.query("INSERT INTO members (email, link, status) VALUES (?, ?, ?);", parametrs);
    }
    catch (err) {
        throw err;
    }
}
;
//# sourceMappingURL=add.js.map