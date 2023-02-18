import { createSlice } from "@reduxjs/toolkit";
import ruleService from "../services/rule.service";

const ruleSlice = createSlice({
  name: "rules",
  initialState: {
    entities: null,
    isLoading: true,
    ruleLoading: false,
    rule: null,
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
    oneRuleRequested: (state) => {
      state.ruleLoading = true;
    },
    oneRuleReceived: (state, action) => {
      state.ruleLoading = false;
      state.rule = action.payload;
    },
    oneRuleRequetFailed: (state, action) => {
      state.ruleLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: ruleReducer, actions } = ruleSlice;

const {
  ruleRequested,
  ruleReceived,
  ruleRequestFailed,
  oneRuleRequested,
  oneRuleReceived,
  oneRuleRequetFailed,
} = actions;

export const loadRuleList = () => async (dispatch) => {
  dispatch(ruleRequested());
  try {
    const ruleData = await ruleService.getTotalRulesList(); // Получение с сервера данных по законам
    dispatch(ruleReceived(ruleData));
  } catch (error) {
    dispatch(ruleRequestFailed(error));
  }
};

export const loadOneRule = (ruleNumber) => async (dispatch) => {
  // ruleNumber - номер закона, передаётся с главной страницы
  dispatch(oneRuleRequested());
  try {
    const ruleData = await ruleService.getOneRule(ruleNumber); // Получение с сервера данных по законам
    dispatch(oneRuleReceived(ruleData));
  } catch (error) {
    dispatch(oneRuleRequetFailed(error));
  }
};

export const getRule = () => (state) => state.rules.entities;
export const getOneRule = () => (state) => state.rules.rule;

export default ruleReducer;
