import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl;

function getChats() {
  return http.get(apiEndpoint + "/channels");
}

function getChat(chatId) {
  return http.get(apiEndpoint + "/channels/" + chatId);
}

function sendMessage(message) {
  return http.post(apiEndpoint + "/messages/private", message);
}

function createChat(users) {
  const requestBody = {
    users: [...users],
    type: "private",
  };
  return http.post(apiEndpoint + "/channels/private", requestBody);
}

const chatService = {
  getChats,
  getChat,
  sendMessage,
  createChat,
};

export default chatService;
