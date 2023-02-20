import axios from "axios";
import config from "../config.json";

const httpDeputy = axios.create({
    baseURL: config.apiEndpoint + "deputy/"
})

const deputyService = {
    getTotalDeputiesList: async ()=>{
        const {data} = await httpDeputy.get("deputies-total-list/")
        return data
    },
    getOneDeputy: async(dep)=>{
        const {data} = await httpDeputy.get(`/${dep}`)
        return data
    }
}

export default deputyService