import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl;

function getChats() {
  return http.get(apiEndpoint + "/channels");
}

function sendMessage(message) {
  return http.post(apiEndpoint + "/messages/private", message);
}

const chatService = {
  getChats,
  sendMessage,
};

export default chatService;
