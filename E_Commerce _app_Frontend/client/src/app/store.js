// // src/redux/store.js

// import { configureStore } from "@reduxjs/toolkit";
// import primeDayReducer from "../features/primeDayDeal/primeDaySlice.js";

// const store = configureStore({
//   reducer: {
//     primeDay: primeDayReducer,
//   },
// });

// export default store;


// src/redux/store.js

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import primeDayReducer from "../features/primeDayDeal/primeDaySlice.js";
// import remainingTimeReducer from "../features/remainingTime/remainingTimeSlice.js";
// import cartReducer from "../features/cart/cartSlice.js";

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedPrimeDayReducer = persistReducer(persistConfig, primeDayReducer);
// const persistedRemainingTimeReducer = persistReducer(persistConfig, remainingTimeReducer);
// const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// const store = configureStore({
//   reducer: {
//     primeDay: persistedPrimeDayReducer,
//     remainingTime: persistedRemainingTimeReducer,
//     cartOnUser: persistedCartReducer,
//   },
// });

// export const persistor = persistStore(store);
// export default store;




// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import primeDayReducer from "../features/primeDayDeal/primeDaySlice.js";
// import remainingTimeReducer from "../features/remainingTime/remainingTimeSlice.js";
// import cartReducer from "../features/cart/cartSlice.js";
// import exchangeReducer from "../features/exchangeProduct/exchangeSlice.js";
// import {thunk} from "redux-thunk";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   primeDay: primeDayReducer,
//   remainingTime: remainingTimeReducer,
//   cartOnUser: cartReducer,
//   exchange: exchangeReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

// export const persistor = persistStore(store);
// export default store;



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import primeDayReducer from "../features/primeDayDeal/primeDaySlice.js";
import remainingTimeReducer from "../features/remainingTime/remainingTimeSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import exchangeReducer from "../features/exchangeProduct/exchangeSlice.js";
import pastProductReducer from "../features/pastProduct/pastProductSlice.js";
import categoryReducer from "../features/categories/categoriesSlice.js";

import { thunk } from "redux-thunk";

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);
export default store;
