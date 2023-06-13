import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";

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
  },
  addTask: async(task)=>{
    const {data} = await httpDeputy.post('/addTask', task)
    console.log(data)
    toast(`Ваше поручение для депутата (${data[0].deputy_name}) отправлено`)
    return data   // возвращаю в deputy.js обновлённый список поручений
  }
};

export default deputyService;
