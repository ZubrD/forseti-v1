import axios from "axios";
import config from "../config.json";

const httpRegion = axios.create({
  baseURL: config.apiEndpoint + "region/", // "region/" - это должно совпадать со ссылкой на роуты в index.js
});

const regionService = {
  getTotalRegionsList: async () => {
    const { data } = await httpRegion.get("regions-total-list/"); // адрес "regions-total-list/" - должен совпадать с одним из роутов
    return data;
  },
};

export default regionService;
