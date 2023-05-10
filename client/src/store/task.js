import { createSlice } from "@reduxjs/toolkit";
import taskService from "../services/task.service";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    taskRequested: (state) => {
      state.isLoading = true;
    },
    taskReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    taskRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: taskReducer, actions } = taskSlice;

const { taskRequested, taskReceived, taskRequestFailed } = actions;

export const loadTaskList =()=> async (dispatch)=>{
  dispatch(taskRequested())
  try{
    const taskData = await taskService.getTaskList()
    dispatch(taskReceived(taskData))
  } catch(error){
    dispatch(taskRequestFailed(error))
  }
}

export const getTask =()=>(state)=>state.task.entities

export default taskReducer;
