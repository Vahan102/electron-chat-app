import { pool } from "./pool.js";

export async function deleteServer(link: string) {
  try {
    await pool.query(`DELETE FROM servers WHERE link = ?`, [link]);
    return true;
  } catch (err) {
    throw err;
  }
};

export async function deleteServerFromMembers(link: string) {
  try {
    await pool.query(`DELETE FROM members WHERE link = '${link}'`)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function leaveGroup(email: string, link: string) {
  try {
    const [result]: any = await pool.query(
      `DELETE FROM members WHERE email = ?`,
      [email]
    );
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err
  };
};

export async function deleteFriend(email: string, name: string) {
  try {
    const [result]: any = await pool.query(
      `DELETE FROM friends WHERE name = ? AND touser = ?`,
      [name, email]
    );
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err
  };
};


export async function deleteChat(email: string, link: string) {
  try {
    const [result]: any = await pool.query(
      `DELETE FROM chats WHERE link = ? AND (email1 = ? OR email2 = ?)`,
      [link, email]
    );
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err
  };
};


export async function deleteUserFromChat(link: string, email: string) {
  try {
    const [result]: any = await pool.query(
      `DELETE FROM members WHERE link = ? AND email = ?`,
      [link, email]
    );
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err
  };
};

export async function deleteMessege() {

}