import axios from "axios";
import config from "../config.json";

const httpRule = axios.create({
  baseURL: config.apiEndpoint + "rule/", // "rule/" - это должно совпадать со ссылкой на роуты в index.js
});

const ruleService = {
  getTotalRulesList: async () => {
    const { data } = await httpRule.get("rules-total-list/");   // адрес "rules-total-list/" - должен совпадать с одним из роутов 
    return data;
  },
  getOneRule: async(num, user)=>{
    const {data} = await httpRule.get(`/${num}/${user}`)
    return data
  },
  getPrefer: async(num)=>{
    const {data} = await httpRule.get(`/prefer/${num}`)
    return data
  }
};

export default ruleService;
