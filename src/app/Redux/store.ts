import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dynamicSlice from "./dynamicSlice";
import mainDrawerSlice from "./mainDrawerSlice";
import authSlice from "./authSlice";

const persistConfig = {
  key: "dynamic",
  version: 1,
  storage,
  blacklist: ["dilaogState"],
};

const rootReducer = combineReducers({
  dynamic: dynamicSlice,
  mainDrawer: mainDrawerSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
