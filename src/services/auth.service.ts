import { post } from "./cg-api.service";
import { IUserCreate } from "../interfaces/user";
import { ILogin } from "../interfaces/auth";

export function login(data: ILogin) {
  return post(`/auth/login`, { data });
}

export function register(data: IUserCreate) {
  return post(`/auth/register`, { data });
}
