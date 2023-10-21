import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./User/userSlice";

export const store = configureStore({
  reducer: { user: userSlice },
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});
