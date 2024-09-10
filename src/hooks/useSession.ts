import { useState, useEffect } from "react";
import { getCookie } from "../services/cookie.service";
import { getUser } from "../services/user.service";

export function useSession() {
  const [user, setUser] = useState<any>();
  const token = getCookie("token");
  let status: "pending" | "authorized" | "unauthorized" = "pending";

  useEffect(() => {
    (async () => {
      if (token) {
        const resp = await getUser({ headers: { Authorization: token } });
        setUser(resp.data);
      }
    })();
  }, [token]);

  if (user?.status === 200) {
    status = "authorized";
    return { user, status };
  }

  if (user?.statusCode === 401 || !token) {
    status = "unauthorized";
    return { user, status };
  }

  return { user, status };
}
