const TOKEN_KEY = "milk_auth_token";
const accessTokenRegex = /(access_token)=(.*?)(?=&)/g;

function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.log("Unable to retrieve access token. ", e);
  }
}

function getTokenFromUrl() {
  const url = window.location.href;
  const accessTokenPart = accessTokenRegex.exec(url);
  return accessTokenPart && accessTokenPart[2];
}

function setToken(token) {
  if (!token) {
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export default {
  getToken,
  getTokenFromUrl,
  setToken,
  removeToken
};
