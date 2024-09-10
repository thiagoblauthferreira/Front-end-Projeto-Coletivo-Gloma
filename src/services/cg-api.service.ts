import { getCookie } from "./cookie.service";

type IMethodType = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

interface IMethod {
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  options?: Record<string, any>;
}

const apiBase = process.env.API_URI || "http://localhost:8080";

async function responseJson(response: Response) {
  if (!response.ok || response.status >= 400) {
    throw await response.clone().json();
  }
  return response.json();
}

function isUrl(url: string): boolean {
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(url);
}

export async function request(
  url: string,
  method?: IMethodType,
  body?: { [key: string]: any } | null,
  headers?: { [key: string]: string },
  options?: { [key: string]: any }
) {
  const token = getCookie("token");

  const updatedHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(headers || {}),
  };

  return await fetch(isUrl(url) ? url : `${apiBase}/api${url}`, {
    method: method,
    headers: updatedHeader,
    body: body ? JSON.stringify(body) : null,
    ...options,
  }).then(responseJson);
}

function buildUrl(baseUrl: string, params?: { [key: string]: any }): string {
  if (!params) {
    return baseUrl;
  }

  const queryString = Object.keys(params)
    .map((k) => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map((param: any) => `${encodeURIComponent(k)}=${encodeURIComponent(param)}`)
          .join("&");
      }
      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");

  return `${baseUrl}${queryString ? `?${queryString}` : ""}`;
}

export async function get(
  url: string,
  { params, headers, options }: Omit<IMethod, "data"> = {}
) {
  return await request(buildUrl(url, params), "GET", null, headers, options);
}

export async function post(
  url: string,
  { data, params, headers, options }: IMethod = {}
) {
  return await request(buildUrl(url, params), "POST", data, headers, options);
}

export async function put(url: string, { data, params, headers, options }: IMethod = {}) {
  return await request(buildUrl(url, params), "PUT", data, headers, options);
}

export async function patch(
  url: string,
  { data, params, headers, options }: IMethod = {}
) {
  return await request(buildUrl(url, params), "PATCH", data, headers, options);
}

export async function del(url: string, { data, params, headers, options }: IMethod = {}) {
  return await request(buildUrl(url, params), "DELETE", data, headers, options);
}
