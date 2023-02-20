import { createSlice } from "@reduxjs/toolkit";
import deputyService from "../services/deputy.service";

const deputySlice = createSlice({
  name: "deputies",
  initialState: {
    entities: null,
    isLoading: true,
    deputyLoading: false,
    deputy: null,
    error: null,
  },
  reducers: {
    deputiesListRequested: (state) => {
      state.isLoading = true;
    },
    deputiesListReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    deputiesListRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    oneDeputyRequested: (state) => {
      state.deputyLoading = true;
    },
    oneDeputyReceived: (state, action) => {
      state.deputy = action.payload;
      state.deputyLoading = false;
    },
    oneDeputyRequestFailed: (state, action) => {
      state.deputyLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: deputyReducer, actions } = deputySlice;
const {
  deputiesListRequested,
  deputiesListReceived,
  deputiesListRequestFailed,
  oneDeputyRequested,
  oneDeputyReceived,
  oneDeputyRequestFailed,
} = actions;

export const loadDeputyList = () => async (dispatch) => {
  dispatch(deputiesListRequested());
  try {
    const deputyData = await deputyService.getTotalDeputiesList(); // Получение с сервера данных по депутатам
    dispatch(deputiesListReceived(deputyData));
  } catch (error) {
    dispatch(deputiesListRequestFailed(error));
  }
};

export const loadOneDeputy = (deputyName) => async (dispatch) => {
  dispatch(oneDeputyRequested());
  try {
    const oneDeputyData = await deputyService.getOneDeputy(deputyName);
    dispatch(oneDeputyReceived(oneDeputyData));
  } catch (error) {
    dispatch(oneDeputyRequestFailed());
  }
};

export const getDeputy = () => (state) => state.deputies.entities;
export const getOneDeputy = ()=>(state)=> state.deputies.deputy

export default deputyReducer;
