export type typeStatus = "approved" | "pending" | "rejected";
export type typeRoles = "donor" | "coordinator" | "user" | "admin";

export interface ILogin {
  email: string;
  password: string;
}
