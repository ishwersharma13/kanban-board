import { configureStore } from "@reduxjs/toolkit";
import workitemsReducer from "./slices/workItemSlice";
export const store = configureStore({
  reducer: { workitemsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
