import { combineReducers, configureStore } from "@reduxjs/toolkit";
import deputyReducer from "./deputy";
import regionReducer from "./region";
import ruleReducer from "./rule";
import userReducer from "./user";

const rootReducer = combineReducers({
  deputy: deputyReducer,
  rules: ruleReducer,
  region: regionReducer,
  user: userReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
