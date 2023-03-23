import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  // params: {
  //   key: process.env.REACT_APP_FIREBASE_KEY,
  // },
});

const authService = {
  register: async (registerData) => {
      const { data } = await httpAuth.post(`signUp`, registerData);
      return data;    
      // Ошибку буду ловить в user.js
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    localStorageService.setTokens(data);
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};
export default authService;
