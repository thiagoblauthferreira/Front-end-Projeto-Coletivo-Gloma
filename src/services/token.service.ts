function base64UrlDecode(str: string) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const decodedData = atob(base64);
  const json = decodeURIComponent(
    decodedData
      .split("")
      .map((code) => {
        return "%" + ("00" + code.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(json);
}
export function decodeJwt(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const payload = parts[1];
  return base64UrlDecode(payload);
}
