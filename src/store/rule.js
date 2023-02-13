import { createSlice } from "@reduxjs/toolkit";
import httpService from "../services/http.service";

const ruleEndpoint = "rule/";

const ruleSlice = createSlice({
  name: "rule",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    ruleRequested: (state) => {
      state.isLoading = true;
    },
    ruleReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    ruleRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: ruleReducer, actions } = ruleSlice;

const { ruleRequested, ruleReceived, ruleRequestFailed } = actions;

export const loadRuleList = () => async (dispatch) => {
  dispatch(ruleRequested());
  try {
    const ruleData = await ruleService.get();   // Получение с сервера данных по законам
    dispatch(ruleReceived(ruleData));
  } catch (error) {
    dispatch(ruleRequestFailed(error));
  }
};

const ruleService = {
  get: async () => {
    const { data } = await httpService.get(ruleEndpoint);
    return data;
  },
};

export const getRule = () => (state) => state.rule.entities;

export default ruleReducer;
