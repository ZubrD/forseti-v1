import { createSlice } from "@reduxjs/toolkit";
import httpService from "../services/http.service";

const deputyEndpoint = "deputy/";

const deputySlice = createSlice({
  name: "deputy",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    deputyRequested: (state) => {
      state.isLoading = true;
    },
    deputyReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    deputyRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: deputyReducer, actions } = deputySlice;
const { deputyRequested, deputyReceived, deputyRequestFailed } = actions;

export const loadDeputyList = () => async (dispatch) => {
  dispatch(deputyRequested());
  try {
    const deputyData = await deputyService.get();   // Получение с сервера данных по депутатам
    dispatch(deputyReceived(deputyData));
  } catch (error) {
    dispatch(deputyRequestFailed(error));
  }
};

const deputyService = {
  get: async () => {
    const { data } = await httpService.get(deputyEndpoint);
    return data;
  },
};


export const getDeputy = () => (state) => state.deputy.entities;

export default deputyReducer;
