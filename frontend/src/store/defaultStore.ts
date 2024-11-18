import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import createDebounce from "redux-debounced";
import indexReducer from "./index";

const defaultState = {};

export const defaultStore = configureStore({
  reducer: indexReducer,
  preloadedState: defaultState,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(thunk, createDebounce()),
});
