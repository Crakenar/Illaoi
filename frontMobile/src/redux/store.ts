import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";

export const Store = configureStore({
  reducer: {
    store: storeReducer
  }
});