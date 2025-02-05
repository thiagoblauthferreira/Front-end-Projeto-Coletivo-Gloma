import { ReactNode } from "react";
import { IUser } from "../../interfaces/user";
import { ISettings } from "../../interfaces/settings";

export interface IAuthProvider {
  currentUser: IUser | null;
  status: string;
  settings: ISettings;
  logout: () => void;
  loginUser: () => void;
}

export interface IContextProvider {
  children: ReactNode;
}
