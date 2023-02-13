import { createSlice } from "@reduxjs/toolkit";
import httpService from "../services/http.service";

const regionEndpoint = "regions/";

const regionSlice = createSlice({
  name: "region",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    regionRequested: (state) => {
      state.isLoading = true;
    },
    regionReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    regionRequestFailed: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: regionReducer, actions } = regionSlice;

const { regionRequested, regionReceived, regionRequestFailed } = actions;

export const loadRegion = () => async (dispatch) => {
  dispatch(regionRequested());
  try {
    const regionData = await regionService.get();   // Получение с сервера данных по регионам
    dispatch(regionReceived(regionData));
  } catch (error) {
    dispatch(regionRequestFailed(error));
  }
};

const regionService = {
  get: async () => {
    const { data } = await httpService.get(regionEndpoint);
    return data;
  },
};

export const getRegion = () => (state) => state.region.entities;

export default regionReducer;
