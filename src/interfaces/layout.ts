import { UrlObject } from "url";
import { typeRoles } from "./auth";

export interface ISidebar {
  id: string;
  text: string;
  icon?: React.ReactNode;
  route?: string;
  roles?: typeRoles[];
}
