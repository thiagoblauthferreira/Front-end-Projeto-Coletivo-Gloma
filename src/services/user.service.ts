import { get } from "./cg-api.service";

export function getUser({ params, headers }: any = {}) {
  return get(`/auth/me`, { params, headers });
}
