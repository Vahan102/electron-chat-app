import { FieldPacket, QueryResult } from "mysql2";
import { pool } from "./pool.js";

export async function addChannel(arr: string[] | number[]) {
  try {
    await pool.query(
      "INSERT INTO servers (name, userCount, link, img, backgraund, admin) VALUES (?, ?, ?, ?, ?, ?);", arr
    );
  } catch (err) {
    throw err;
  }
};

export async function addcomment(arr: string[] | number[]) {
  try {
    await pool.query(
      "INSERT INTO comments (author, text, link) VALUES (?, ?, ?);", arr
    );
  } catch (err) {
    throw err;
  };
};

export async function addcommentInDiscordServer(arr: string[] | number[]) {
  try {
    await pool.query(
      "INSERT INTO messegesingroup (postman, text, link) VALUES (?, ?, ?);", arr
    );
  } catch (err) {
    throw err;
  };
};


export async function addMessege(parametrs: string[]): Promise<boolean> {
  try {
    await pool.query(
      "INSERT INTO messages (postman, text, touser, img) VALUES (?, ?, ?, ?);",
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
      "INSERT INTO users (name, email, avatar, surname, solt, password, tag) VALUES (?, ?, ?, ?, ?, ?, ?);",
      parametrs
    );
    return true;
  } catch (err) {
    throw err;
  }
};


export async function joinGroup(parametrs: string[]): Promise<boolean> {
  try {
    await pool.query(
      "INSERT INTO members (email, link, status, name, img) VALUES (?, ?, ?, ?, ?);",
      parametrs
    );
    return true;
  } catch (err) {
    throw err;
  }
};

export async function addFriend(parametrs: any[]) {
  try {
    await pool.query(
      "INSERT INTO friends (name,touser) VALUES (?, ?);",
      parametrs
    );
  } catch (err) {
    throw err;
  }
};

export async function addChat(parametrs: any[]) {
  try {
    await pool.query(
      "INSERT INTO chats (email1,email2,link) VALUES (?, ?, ?);",
      parametrs
    );
  } catch (err) {
    return false
  }
};


export async function addUserInGroup(parametrs: string[]) {
  try {
    await pool.query(
      "INSERT INTO members (email, link, status) VALUES (?, ?, ?);",
      parametrs
    );
  } catch (err) {
    throw err;
  }
};