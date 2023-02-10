import { createSlice } from "@reduxjs/toolkit";

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

export const loadRuleList = () => (dispatch) => {
  dispatch(ruleRequested());
  try {
    fetch("http://localhost:3001/rules")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const newData = JSON.parse(data);
        dispatch(ruleReceived(newData));
      });
  } catch (error) {
    dispatch(ruleRequestFailed(error));
  }
};

export const getRule=()=>(state)=>state.rule.entities

export default ruleReducer;
