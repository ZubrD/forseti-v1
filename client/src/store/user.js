import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
// import userService from "../services/user.service";
import { genereteAuthError } from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: {
        userId: localStorageService.getUserId(),
        userName: localStorageService.getUserName(),
      },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: {
        userId: null,
        userName: null,
      },
      isLoggedIn: false,
      dataLoaded: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const {
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  userUpdateSuccessed,
} = actions;

const authRequested = createAction("user/authRequested");
const userUpdateFailed = createAction("user/userUpdateFailed");
const userUpdateRequested = createAction("user/userUpdateRequested");

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      console.log(data);
      localStorageService.setTokens(data);
      dispatch(
        authRequestSuccess({ userId: data.userId, userName: data.userName })
      );

      window.history.back();
    } catch (error) {
      console.log("Логин ", error.response.data.error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = genereteAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        // dispatch(authRequestFailed(error.message));
      }
    }
  };

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
   
    console.log("data ", data.error);
    if (!data.error) {
      // localStorageService.setTokens(data);
      // dispatch(authRequestSuccess({ userId: data.userId }));
      console.log("data ", data);
      window.history.back();
    } else {
      if (data.error.code === 400) {
        const errorMessage = genereteAuthError(data.error.message);
        dispatch(authRequestFailed(errorMessage));
        console.log("data ", data.error.code);
      }
    }    
  } catch (error) {
    // console.log(error)
  }
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getUserName = () => (state) => {
  if (state.user.auth) {
    return state.user.auth.userName;
  } else {
    return "anonimous";
  }
};
export const getAuthErrors = () => (state) => state.user.error;
export const getUserFromStore = () => (state) => {
  if (state.user.auth) {
    return state.user.auth.userId;
  } else {
    return "anomous";
  }
};

export default userReducer;
