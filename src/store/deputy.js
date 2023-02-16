import { createSlice } from "@reduxjs/toolkit";
import deputyService from "../services/deputy.service";


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
    const deputyData = await deputyService.getTotalDeputiesList();   // Получение с сервера данных по депутатам
    dispatch(deputyReceived(deputyData));
  } catch (error) {
    dispatch(deputyRequestFailed(error));
  }
};


export const getDeputy = () => (state) => state.deputy.entities;

export default deputyReducer;
