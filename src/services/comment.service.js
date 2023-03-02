import axios from "axios";
import config from "../config.json";

const httpComment = axios.create({
  baseURL: config.apiEndpoint + "comment/", // "comment/" - это должно совпадать со ссылкой на роуты в index.js
});