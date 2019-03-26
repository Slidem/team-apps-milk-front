import axios from "axios";
import * as urls from "../config/apiRegistry";
import tokenRegistry from "../config/tokenRegistry";

axios.interceptors.request.use(
  config => {
    const token = tokenRegistry.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(null, error => {
  if (isAnauthorized(error)) {
    window.location.href = urls.authUrl;
  } else if (isUnexpectedError(error)) {
    console.log("Unexpected error occured.");
  }

  return Promise.reject(error);
});

function isAnauthorized(error) {
  return error.response && error.response.status === 401;
}

function isUnexpectedError(error) {
  const response = error.response;
  return response && (response.status < 400 || response.status >= 500);
}

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put
};
