export const ACCESS_TOKEN = "@access-token";
export const UID = "@uid";
export const EXPIRY = "@expiry";
export const CLIENT = "@client";
export const TOKEN_TYPE = "@token-type";

export const isAuthenticated = () => (localStorage.getItem(ACCESS_TOKEN) !== null && localStorage.getItem(ACCESS_TOKEN) !== "undefined");

export const getTokens = () => ( 
  {
    access_token: localStorage.getItem(ACCESS_TOKEN), 
    uid: localStorage.getItem(UID),
    expiry: localStorage.getItem(EXPIRY),
    client: localStorage.getItem(CLIENT),
    token_type: localStorage.getItem(TOKEN_TYPE)
  }
);

export const setTokens = (token, uid, expiry, client, token_type) => {
  localStorage.setItem(ACCESS_TOKEN, token);
  localStorage.setItem(UID, uid);
  localStorage.setItem(EXPIRY, expiry);
  localStorage.setItem(CLIENT, client);
  localStorage.setItem(TOKEN_TYPE, token_type);
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(UID);
  localStorage.removeItem(EXPIRY);
  localStorage.removeItem(CLIENT);
  localStorage.removeItem(TOKEN_TYPE);
};