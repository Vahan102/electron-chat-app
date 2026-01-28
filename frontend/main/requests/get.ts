interface searchGroup {
  link: string
}

interface searchUser {
  name: string
}

interface getUserServers {

}

interface getGroupMesseges {
   link:string;
}

type SchemaMap = {
  searchGroup: searchGroup,
  searchUser: searchUser,
  getUserServers:getUserServers,
  getGroupMesseges: getGroupMesseges
};


const pathObj = {
  searchGroup: "http://localhost:3027/get/getserverbylink",
  searchUser: "http://localhost:3027/get/getuserbyname",
  getUserServers: "http://localhost:3027/get/getuserservers",
  getGroupMesseges:"http://localhost:3027/get//getservermesseges"
};

export async function getRequest<T extends keyof SchemaMap>(
  path: T,
  token:string,
  params?: SchemaMap[T],
) {
  try {
    let url = pathObj[path];

    if (params) {
      const query = new URLSearchParams(params as unknown as Record<string, string>);
      url += "?" + query.toString();
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authentication": `Bearer ${token}`
      },

    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    console.log("Server response:", data);
    return data;
  } catch (err) {
    console.error("Request error:", err);
  }
}
