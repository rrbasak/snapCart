import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import primeDayReducer from "../features/primeDayDeal/primeDaySlice.js";
import remainingTimeReducer from "../features/remainingTime/remainingTimeSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import exchangeReducer from "../features/exchangeProduct/exchangeSlice.js";
import pastProductReducer from "../features/pastProduct/pastProductSlice.js";
import categoryReducer from "../features/categories/categoriesSlice.js";
import statusReducer from "../features/status/statusSlice.js";

import {thunk} from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  primeDay: primeDayReducer,
  remainingTime: remainingTimeReducer,
  cartOnUser: cartReducer,
  exchangeProduct: exchangeReducer,
  pastProduct: pastProductReducer,
  categories: categoryReducer,
  status:statusReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);
export default store;
