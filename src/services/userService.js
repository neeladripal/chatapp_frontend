import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

function search(key) {
  return http.get(`${apiEndpoint}/search?key=${key}`);
}

const userService = {
  register,
  search,
};

export default userService;
