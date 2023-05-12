import { createSlice } from "@reduxjs/toolkit";
import ruleService from "../services/rule.service";

const ruleSlice = createSlice({
  name: "rules",
  initialState: {
    entities: null,
    isLoading: true,
    ruleLoading: false,
    newRuleLoading: true,
    rule: null,
    newRules: null,
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
    newRuleRequested: (state) => {
      state.isLoading = true;
    },
    newRuleReceived: (state, action) => {
      state.newRules = action.payload;
      state.isLoading = false;
    },
    newRuleRequestFailed: (state, action) => {
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
    setUserVote: (state, action) => {
      state.rule = action.payload;
    },
  },
});

const { reducer: ruleReducer, actions } = ruleSlice;

const {
  ruleRequested,
  ruleReceived,
  ruleRequestFailed,
  newRuleRequested,
  newRuleReceived,
  newRuleRequestFailed,
  oneRuleRequested,
  oneRuleReceived,
  oneRuleRequetFailed,
  setUserVote,
} = actions;

export const loadRuleList = () => async (dispatch) => {
  dispatch(ruleRequested());
  dispatch(newRuleRequested());
  try {
    const ruleData = await ruleService.getTotalRulesList(); // Получение с сервера данных по законам
    const newRuleData = await ruleService.getNewRulesList();
    dispatch(ruleReceived(ruleData));
    dispatch(newRuleReceived(newRuleData));
  } catch (error) {
    dispatch(ruleRequestFailed(error));
    dispatch(newRuleRequestFailed(error))
  }
};

export const loadOneRule = (ruleNumber, userId) => async (dispatch) => {
  // ruleNumber - номер закона, передаётся с главной страницы
  dispatch(oneRuleRequested());
  try {
    const ruleData = await ruleService.getOneRule(ruleNumber, userId); // Получение с сервера данных по законам
    dispatch(oneRuleReceived(ruleData));
  } catch (error) {
    dispatch(oneRuleRequetFailed(error));
  }
};

export const userVoting =
  (resultVote, currentUser, ruleNumber) => async (dispatch, getState) => {
    // Изменение статуса голосования пользователя за закон
    const ruleList = getState().rules.rule;

    const voteYes = Number(ruleList.populiVoteYes);
    const voteNo = Number(ruleList.populiVoteNo);
    const voteAbstained = Number(ruleList.populiVoteAbst);
    try {
      if (resultVote !== "Не голосовал") {
        await ruleService.setUserVote(resultVote, currentUser, ruleNumber);
        if (resultVote === "За") {
          // Все блоки if нужны для ДОБАВЛЕНИЯ  ...
          const ruleListClone = {
            ...ruleList,
            userVote: resultVote,
            populiVoteYes: voteYes + 1,
          };
          dispatch(setUserVote(ruleListClone));
        }
        if (resultVote === "Против") {
          // ... выбора пользователя ...
          const ruleListClone = {
            ...ruleList,
            userVote: resultVote,
            populiVoteNo: voteNo + 1,
          };
          dispatch(setUserVote(ruleListClone));
        }
        if (resultVote === "Воздержался") {
          // ... на диаграмму народного голосования
          const ruleListClone = {
            ...ruleList,
            userVote: resultVote,
            populiVoteAbst: voteAbstained + 1,
          };
          dispatch(setUserVote(ruleListClone));
        }
      } else {
        await ruleService.discardUserVote(currentUser, ruleNumber);
        if (ruleList.userVote === "За") {
          // Эти блоки if нужны для отображения ИСКЛЮЧЕНИЯ ...
          const ruleListClone = {
            ...ruleList,
            userVote: resultVote,
            populiVoteYes: voteYes - 1,
          };
          dispatch(setUserVote(ruleListClone));
        }
        if (ruleList.userVote === "Против") {
          // выбора пользователи из диаграмммы народного голосования
          const ruleListClone = {
            ...ruleList,
            userVote: resultVote,
            populiVoteNo: voteNo - 1,
          };
          dispatch(setUserVote(ruleListClone));
        }
        if (ruleList.userVote === "Воздержался") {
          // ...
          const ruleListClone = {
            ...ruleList,
            userVote: resultVote,
            populiVoteAbst: voteAbstained - 1,
          };
          dispatch(setUserVote(ruleListClone));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

export const createSuggestion = (suggestion) => async (dispatch) => {
  try {
    const suggContent = await ruleService.addSuggestion(suggestion);
  } catch (error) {
    console.log(error);
  }
};

export const getRule = () => (state) => state.rules.entities;
export const getOneRule = () => (state) => state.rules.rule;
export const getNewRules = () => (state) => state.rules.newRules;

export default ruleReducer;
