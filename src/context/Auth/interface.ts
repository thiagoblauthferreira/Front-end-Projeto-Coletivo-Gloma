import { ReactNode } from "react";
import { IUser } from "../../interfaces/user";

export interface IAuthProvider {
  currentUser: IUser | null;
  status: string;
  logout: () => void;
  loginUser: () => void;
}

export interface IContextProvider {
  children: ReactNode;
}
