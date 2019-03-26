import httpService from "./httpService";
import * as urls from "../config/apiRegistry";

export function getUserInfo() {
  return httpService.get(urls.milkApiUrl + "users/me");
}
