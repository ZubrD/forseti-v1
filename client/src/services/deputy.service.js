import axios from "axios";
import config from "../config.json";

const httpDeputy = axios.create({
  baseURL: config.apiEndpoint + "deputy/",
});

const deputyService = {
  getTotalDeputiesList: async () => {
    const { data } = await httpDeputy.get("deputies-total-list/");
    return data;
  },
  getOneDeputy: async (dep, currentUser) => {
    const { data } = await httpDeputy.get(`/${dep}/${currentUser}`);
    return data;
  },
  postLikeTask: async(likeData)=>{
    await httpDeputy.post('/likeTask', likeData)
  },
  postWithdrawLikeTask: async(likeData)=>{
    await httpDeputy.post('/withdrawLikeTask', likeData)
  }
};

export default deputyService;
