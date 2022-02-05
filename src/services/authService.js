import http from "./httpService";
import jwt_decode from "jwt-decode";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwt_decode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export default { getJwt, login, loginWithJwt, logout, getCurrentUser };
