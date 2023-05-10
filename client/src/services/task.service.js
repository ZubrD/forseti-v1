import axios from "axios";
import config from "../config.json";

const httpTask = axios.create({
  baseURL: config.apiEndpoint + "task/",
});

const taskService = {
  getTaskList: async () => {
    const { data } = await httpTask.get("task-list");
    return data;
  },
};

export default taskService;
