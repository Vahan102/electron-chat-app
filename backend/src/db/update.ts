import { pool } from "./pool.js"

export async function updateServer(offer: string, email:string) {
    try {
        await pool.query(`UPDATE servers SET ${offer} WHERE admin = ${email};`);
    } catch (err) {
        throw err
    };
};

export async function updatedProfile(offer:string,email:string) {
    try {
        await pool.query(`UPDATE users SET ${offer} WHERE email = ${email};`);
    } catch (err) {
        throw err
    };
};