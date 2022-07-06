import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    increment(state, action) {
      const idx = state.findIndex((a) => {
        return a.id == action.payload;
      });
      state[idx].count++;
    },
    decrement(state, action) {
      const idx = state.findIndex((a) => {
        return a.id == action.payload;
      });
      state[idx].count--;
    },
    addItem(state, action) {
      state.push(action.payload);
    },
    removeItem(state, action) {
      const idx = state.findIndex((a) => {
        return a.id == action.payload;
      });
      state.splice(idx, 1);
    },
    removeAll(state) {
      state.splice(0, state.length);
    },
  },
});

const rootReducer = combineReducers({ cart: cart.reducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    // cart: cart.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const { increment, decrement, addItem, removeItem, removeAll } =
  cart.actions;
export const persistor = persistStore(store);
