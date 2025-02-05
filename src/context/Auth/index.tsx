import React from "react";
import { IUser } from "../../interfaces/user";
import { getUser } from "../../services/user.service";
import { IAuthProvider, IContextProvider } from "./interface";
import { delCookie, getCookie } from "../../services/cookie.service";
import { ISettings } from "../../interfaces/settings";
import { defaultSettings } from "../../utils/default";

const AuthContext = React.createContext<IAuthProvider>({} as IAuthProvider);

export function AuthProvider({ children }: IContextProvider) {
  const [currentUser, setCurrentUser] = React.useState<IUser | null>(null);
  const [status, setStatus] = React.useState<string>("pending");

  const [settings] = React.useState<ISettings>(defaultSettings);

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
    <AuthContext.Provider value={{ currentUser, status, settings, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthProvider = () => {
  return React.useContext(AuthContext);
};
