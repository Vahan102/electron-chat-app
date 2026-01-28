interface Registration {
  name: string;
  surname: string;
  email: string;
  password: string;
}
interface Login {
  email: string;
  password: string;
}

interface createGroup {
  name: string;
  img:string;
}

interface joinGroup {
  link: string;
}

interface deleteserver {
  link:string;
}

export type SchemaMap = {
  registration: Registration,
  login: Login,
  createGroup: createGroup,
  joinGroup: joinGroup,
  deleteServer:deleteserver
};

export const pathObj = {
  registration: "http://localhost:3027/authentication/registration",
  login: "http://localhost:3027/authentication/login",
  createGroup: "http://localhost:3027/add/createserver",
  joinGroup: "http://localhost:3027/add/joingroup",
  deleteServer:"http://localhost:3027/delete//deleteserver"
};

export async function sendRequest<T extends keyof SchemaMap>(
  path: T,
  method: "GET" | "POST" | "PUT" | "DELETE",
  type: T,
  token: string,
  body: SchemaMap[T]
) {
  try {
    const url = pathObj[path];

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "authentication": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    console.log("Server response:", data);
    return data;
  } catch (err) {
    console.error("Request error:", err);
  }
}




