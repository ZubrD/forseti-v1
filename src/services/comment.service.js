import axios from "axios";
import config from "../config.json";

const httpComment = axios.create({
  baseURL: config.apiEndpoint + "comment/", // "comment/" - это должно совпадать со ссылкой на роуты в index.js
});

const commentService = {
  getComments: async(num)=>{
    const {data} = await httpComment.get(`/${num}`)
    return data
  },
  addComment: async(commentData)=>{
    const {data} = await httpComment.post("/add", commentData)
    return data
  }

};

export default commentService;