import { pool } from "./pool.js";

export async function getUser(email: string) {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return user[0];
    } catch (err) {
        throw err;
    };
};

export async function userVerifi(email: string, password: string): Promise<boolean> {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password]);
        if (Array.isArray(user[0])) {
            if ("email" in user[0][0]) {
                return true;
            } else return false
        } else return false;
    } catch (err) {
        throw err;
    };
};


export async function getSereversParametrs(link: string) {
    try {
       const server = await pool.query(`SELECT * FROM servers WHERE link = ?`, [link]);
       return server[0];
    } catch (err) {
        throw err;
    }
};