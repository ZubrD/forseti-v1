import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";

const httpRule = axios.create({
  baseURL: config.apiEndpoint + "rule/", // "rule/" - это должно совпадать со ссылкой на роуты в index.js
});

const ruleService = {
  getTotalRulesList: async () => {
    const { data } = await httpRule.get("rules-total-list/"); // адрес "rules-total-list/" - должен совпадать с одним из роутов
    return data;
  },
  getNewRulesList: async () => {
    const { data } = await httpRule.get("new-rules/");
    return data;
  },
  getNewVotedList: async () => {
    const { data } = await httpRule.get("new-voted/");
    return data;
  },
  getMostVisitsList: async () => {
    const { data } = await httpRule.get("most-visits/");
    return data;
  },
  getMostPreferList: async () => {
    const { data } = await httpRule.get("most-prefer/");
    return data;
  },
  getMostNotPreferList: async () => {
    const { data } = await httpRule.get("most-notprefer/");
    return data;
  },
  getOneRule: async (num, user) => {
    const { data } = await httpRule.get(`/${num}/${user}`);
    return data;
  },
  getRandomRule: async () => {
    const { data } = await httpRule.get("random-rule/");
    return data;
  },
  getPrefer: async (num) => {
    const { data } = await httpRule.get(`/prefer/${num}`);
    return data;
  },
  setPrefer: async (num, user) => {
    const preferData = { num, user };
    await httpRule.post(`/setPrefer`, preferData);
  },
  unSetPrefer: async (num, user) => {
    const preferData = { num, user };
    await httpRule.post(`/unSetPrefer`, preferData);
  },
  setNotPrefer: async (num, user) => {
    const preferData = { num, user };
    await httpRule.post(`/setNotPrefer`, preferData);
  },
  unSetNotPrefer: async (num, user) => {
    const preferData = { num, user };
    await httpRule.post(`/unSetNotPrefer`, preferData);
  },
  setUserVote: async (result, user, ruleNumber) => {
    const voteData = { result, user, ruleNumber };
    await httpRule.post("/setUserVote", voteData);
  },
  discardUserVote: async (user, ruleNumber) => {
    const voteData = { user, ruleNumber };
    await httpRule.post("/discardUserVote", voteData);
  },
  addSuggestion: async (suggestionData) => {
    const resultPostSuggestion = await httpRule.post(
      "/addSuggestion",
      suggestionData
    );
    toast(resultPostSuggestion.data);
  },
};

export default ruleService;
