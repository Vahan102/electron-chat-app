import { pool } from "./pool.js";

export async function deleteServer(link: string) {
    try {
      await pool.query(`DELETE FROM servers WHERE link = ?`, [link]);
      return true;
    } catch (err) {
        throw err;
    }
};

export async function deleteMessege(link:string) {
  try {
    
  } catch (err) {
    throw err
  }
};