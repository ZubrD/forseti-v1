import { combineReducers, configureStore } from "@reduxjs/toolkit";
import deputyReducer from "./deputy";
import regionReducer from "./region";
import ruleReducer from "./rule";

const rootReducer = combineReducers({
  deputy: deputyReducer,
  rule: ruleReducer,
  region: regionReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
