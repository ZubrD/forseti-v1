import { createSlice } from "@reduxjs/toolkit";

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

export const loadRegion = () => (dispatch) => {
  dispatch(regionRequested());
  try {
    fetch("http://localhost:3001/regions")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const newData = JSON.parse(data);
        dispatch(regionReceived(newData));
      });
  } catch (error) {
    dispatch(regionRequestFailed(error));
  }
};

export const getRegion = () => (state) => state.region.entities;


export default regionReducer;
