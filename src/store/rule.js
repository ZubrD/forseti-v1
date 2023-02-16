import { createSlice } from "@reduxjs/toolkit";
import ruleService from "../services/rule.service";

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
    const ruleData = await ruleService.getTotalRulesList();   // Получение с сервера данных по законам
    dispatch(ruleReceived(ruleData));
  } catch (error) {
    dispatch(ruleRequestFailed(error));
  }
};

export const getRule = () => (state) => state.rule.entities;

export default ruleReducer;
