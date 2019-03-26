export const authUrl = buildAuthUrl();

export const milkApiUrl = process.env.REACT_APP_MILK_API_URL;

// --------------------------------------------------------------

function buildAuthUrl() {
  let authUrl = process.env.REACT_APP_AUTH_AUTHORIZATION_URL;
  authUrl += "?client_id=" + process.env.REACT_APP_AUTH_CLIENT_ID;
  authUrl += "&scope=" + process.env.REACT_APP_AUTH_SCOPE;
  authUrl += "&redirect_uri=" + process.env.REACT_APP_APP_URL;
  authUrl += "&response_type=token";
  return authUrl;
}
