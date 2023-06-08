import { createSlice } from "@reduxjs/toolkit";
import ruleService from "../services/rule.service";
import { toast } from "react-toastify";

const ruleSlice = createSlice({
  name: "rules",
  initialState: {
    entities: null,
    isLoading: true,
    ruleLoading: false,
    newRuleLoading: true,
    newVotedLoading: true,
    mostVisitsLoading: true,
    mostPreferLoading: true,
    mostNotPreferLoading: true,
    randomRuleLoading: true,
    rule: null,
    newRules: null,
    newVoted: null,
    mostVisits: null,
    mostPrefer: null,
    mostNotPrefer: null,
    randomRule: null,
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
      state.newRuleLoading = true;
    },
    newRuleReceived: (state, action) => {
      state.newRules = action.payload;
      state.newRuleLoading = false;
    },
    newRuleRequestFailed: (state, action) => {
      state.error = action.payload;
      state.newRuleLoading = false;
    },
    newVotedRequested: (state) => {
      state.newVotedLoading = true;
    },
    newVotedReceived: (state, action) => {
      state.newVoted = action.payload;
      state.newVotedLoading = false;
    },
    newVotedRequestFailed: (state, action) => {
      state.error = action.payload;
      state.newVotedLoading = false;
    },
    mostVisitsRequested: (state) => {
      state.mostVisitsLoading = true;
    },
    mostVisitsReceived: (state, action) => {
      state.mostVisits = action.payload;
      state.mostVisitsLoading = false;
    },
    mostVisitsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.mostVisitsLoading = false;
    },
    mostPreferRequested: (state) => {
      state.mostPreferLoading = true;
    },
    mostPreferReceived: (state, action) => {
      state.mostPrefer = action.payload;
      state.mostPreferLoading = false;
    },
    mostPreferRequestFailed: (state, action) => {
      state.error = action.payload;
      state.mostPreferLoading = false;
    },
    mostNotPreferRequested: (state) => {
      state.mostNotPreferLoading = true;
    },
    mostNotPreferReceived: (state, action) => {
      state.mostNotPrefer = action.payload;
      state.mostNotPreferLoading = false;
    },
    mostNotPreferRequestFailed: (state, action) => {
      state.error = action.payload;
      state.mostNotPreferLoading = false;
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
    oneRuleUpdated: (state, action) => {
      state.rule = action.payload;
    },
    randomRuleRequested: (state) => {
      state.randomRuleLoading = true;
    },
    randomRuleReceived: (state, action) => {
      state.randomRule = action.payload;
      state.randomRuleLoading = false;
    },
    randomRuleRequestFailed: (state, action) => {
      state.error = action.payload;
      state.randomRuleLoading = false;
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
  newVotedRequested,
  newVotedReceived,
  newVotedRequestFailed,
  mostVisitsRequested,
  mostVisitsReceived,
  mostVisitsRequestFailed,
  mostPreferRequested,
  mostPreferReceived,
  mostPreferRequestFailed,
  mostNotPreferRequested,
  mostNotPreferReceived,
  mostNotPreferRequestFailed,
  oneRuleRequested,
  oneRuleReceived,
  oneRuleRequetFailed,
  oneRuleUpdated,
  randomRuleRequested,
  randomRuleReceived,
  randomRuleRequestFailed,
  setUserVote,
} = actions;

export const loadRuleList = () => async (dispatch) => {
  dispatch(ruleRequested());
  dispatch(newRuleRequested());
  dispatch(newVotedRequested());
  dispatch(mostVisitsRequested());
  dispatch(mostPreferRequested());
  dispatch(mostNotPreferRequested());
  dispatch(randomRuleRequested());
  try {
    const ruleData = await ruleService.getTotalRulesList(); // Получение с сервера данных по законам
    const newRuleData = await ruleService.getNewRulesList();
    const newVotedData = await ruleService.getNewVotedList();
    const mostVisitsData = await ruleService.getMostVisitsList();
    const mostPrefer = await ruleService.getMostPreferList();
    const mostNotPrefer = await ruleService.getMostNotPreferList();
    const randomRule = await ruleService.getRandomRule();
    dispatch(ruleReceived(ruleData));
    dispatch(newRuleReceived(newRuleData));
    dispatch(newVotedReceived(newVotedData));
    dispatch(mostVisitsReceived(mostVisitsData));
    dispatch(mostPreferReceived(mostPrefer));
    dispatch(mostNotPreferReceived(mostNotPrefer));
    dispatch(randomRuleReceived(randomRule));
  } catch (error) {
    dispatch(ruleRequestFailed(error));
    dispatch(newRuleRequestFailed(error));
    dispatch(newVotedRequestFailed(error));
    dispatch(mostVisitsRequestFailed(error));
    dispatch(mostPreferRequestFailed(error));
    dispatch(mostNotPreferRequestFailed(error));
    dispatch(randomRuleRequestFailed(error));
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
    toast.error("Ошибка отправки предложения на сервер");
    console.log(error);
  }
};

export const updateRule = (ruleNewData) => async (dispatch) => {
  console.log('ruleNeData ', ruleNewData)
  try {
    dispatch(oneRuleUpdated(ruleNewData));
  } catch (error) {}
};

export const setNecessary = (ruleNumber, user) => async (dispatch) => {
  
  try {
    await ruleService.setPrefer(ruleNumber, user); // голосование "Да" за нужность закона
  } catch (error) {
    console.log(error);
  }
};

export const unSetNecessary = (ruleNumber, user) => async (dispatch) => {
  try {
    await ruleService.unSetPrefer(ruleNumber, user); // голосование "Да" за нужность закона
  } catch (error) {
    console.log(error);
  }
};

export const setNotNecessary = (ruleNumber, user) => async (dispatch) => {
  try {
    await ruleService.setNotPrefer(ruleNumber, user); // голосование "Да" за нужность закона
  } catch (error) {
    console.log(error);
  }
};

export const unSetNotNecessary = (ruleNumber, user) => async (dispatch) => {
  try {
    await ruleService.unSetNotPrefer(ruleNumber, user); // голосование "Да" за нужность закона
  } catch (error) {
    console.log(error);
  }
};

export const getRule = () => (state) => state.rules.entities;
export const getOneRule = () => (state) => state.rules.rule;
export const getNewRules = () => (state) => state.rules.newRules;
export const getNewVoted = () => (state) => state.rules.newVoted;
export const getMostVisits = () => (state) => state.rules.mostVisits;
export const getMostPrefer = () => (state) => state.rules.mostPrefer;
export const getMostNotPrefer = () => (state) => state.rules.mostNotPrefer;
export const getRandomRule = () => (state) => state.rules.randomRule;

export default ruleReducer;
