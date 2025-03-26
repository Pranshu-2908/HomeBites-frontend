export const getAuthFromCookies = (): boolean => {
  if (typeof document !== "undefined") {
    return document.cookie.includes("token=");
  }
  return false;
};
