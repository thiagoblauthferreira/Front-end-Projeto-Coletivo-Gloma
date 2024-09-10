import React from "react";
import { IAuthProvider, IContextProvider } from "./interface";
import { IUser } from "../../interfaces/user";
import { getUser } from "../../services/user.service";
import { delCookie, getCookie } from "../../services/cookie.service";

const AuthContext = React.createContext<IAuthProvider>({} as IAuthProvider);

export function AuthProvider({ children }: IContextProvider) {
  const [currentUser, setCurrentUser] = React.useState<IUser | null>(null);
  const [status, setStatus] = React.useState<string>("pending");

  const logout = async () => {
    delCookie("token");
    localStorage.clear();
    window.location.replace("/auth/login");
  };

  const loginUser = async () => {
    try {
      const resp = await getUser();

      setCurrentUser(resp.data);
      setStatus(resp.data.status);
    } catch (error) {
      console.error(error);
      setStatus("unauthorized");
      delCookie("token");
      localStorage.clear();
    }
  };

  const load = async () => {
    const token = getCookie("token");
    if (!token) return;

    loginUser();
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, status, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthProvider = () => {
  return React.useContext(AuthContext);
};
