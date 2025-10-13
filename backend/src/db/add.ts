import { FieldPacket, QueryResult } from "mysql2";
import { pool } from "./pool.js";

export async function addChannel(arr:string[] | number[]) {
    try {
        await pool.query(
            "INSERT INTO channels (name, userCount, link, img, backgraund, admin) VALUES (?, ?, ?, ?, ?, ?);",arr
        );
    } catch (err) {
        throw err;
    }
};

export async function addcomment(arr:string[] | number[]) {
    try {
        await pool.query(
            "INSERT INTO comments (author, text, link) VALUES (?, ?, ?);",arr
        );
    } catch (err) {
        throw err;
    };
};


export async function addMessege(parametrs: string[]): Promise<boolean> {
  try {
    await pool.query(
      "INSERT INTO messeges (postman, text, touser, img) VALUES (?, ?, ?, ?);",
      parametrs
    );
    return true;
  } catch (err) {
    throw err;
  }
};

export async function addUser(parametrs: string[]): Promise<boolean> {
  try {
    await pool.query(
      "INSERT INTO users (name, email, avatar, surname, solt, password) VALUES (?, ?, ?, ?, ?, ?);",
      parametrs
    );
    return true;
  } catch (err) {
    throw err;
  }
}