import http from "./httpService";
import jwt_decode from "jwt-decode";
import config from "../config.json";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";
const userInfo = "user-info";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function login(email, password) {
  const response = await http.post(apiEndpoint, {
    email,
    password,
  });
  const jwt = response.headers["x-auth-token"];
  localStorage.setItem(tokenKey, jwt);
  cookies.set(userInfo, JSON.stringify(response.data), { path: "/" });
}

export function loginWithJwt(jwt, user) {
  localStorage.setItem(tokenKey, jwt);
  cookies.set(userInfo, JSON.stringify(user), { path: "/" });
}

export function logout() {
  localStorage.removeItem(tokenKey);
  cookies.remove(userInfo);
}

export function getCurrentUser() {
  try {
    const user = cookies.get(userInfo);
    const { email } = jwt_decode(getJwt());
    user.email = email;
    return user;
  } catch (ex) {
    return null;
  }
}

const authService = { getJwt, login, loginWithJwt, logout, getCurrentUser };
export default authService;
