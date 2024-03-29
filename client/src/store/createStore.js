import { combineReducers, configureStore } from "@reduxjs/toolkit";
import deputyReducer from "./deputy";
import regionReducer from "./region";
import ruleReducer from "./rule";
import userReducer from "./user";
import commentReducer from "./comment";
import taskReducer from "./task";

const rootReducer = combineReducers({
  deputies: deputyReducer,
  rules: ruleReducer,
  region: regionReducer,
  user: userReducer,
  comments: commentReducer,
  task: taskReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
