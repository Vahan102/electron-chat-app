import mysql from "mysql2/promise";

export const pool:mysql.Pool =  mysql.createPool({
  host: "localhost", 
  user: "root",
  password: "password",
  database: "discord"
});


