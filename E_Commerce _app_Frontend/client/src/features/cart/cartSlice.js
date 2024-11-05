// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   length: 0,
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       state.items.push(action.payload);
//       state.length += 1;
//     },
//     setCart: (state, action) => {
//       state.items = action.payload;
//       state.length = action.payload.length;
//     },
//   },
// });

// export const { addToCart, setCart } = cartSlice.actions;
// export default cartSlice.reducer;

// redux/cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   items: [],
//   length: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemToCart: (state, action) => {
//       state.items.push(action.payload);
//       state.length = state.items.length;
//     },
//     setCart: (state, action) => {
//       state.items = action.payload;
//       state.length = state.items.length;
//     },
//     removeItemFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item._id !== action.payload.id);
//       state.length = state.items.length;
//     },
//   },
// });

// export const addItemToCartAsync = createAsyncThunk(
//   "cart/addItemToCartAsync",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/v1/cart/create-cart", payload);
//       return response.data.cart;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const { addItemToCart, setCart, removeItemFromCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  items: [],
  length: 0,
  status: "idle", // Track loading state
  error: null,
};

// Async thunk for adding an item to the cart
export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCartAsync",
  async (payload, thunkAPI) => {
    try {
      //console.log("payload", payload);
      const response = await axios.post("/api/v1/cart/create-cart", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Regular reducers
//     setCart: (state, action) => {
//       state.items = action.payload;
//       state.length = state.items.length;
//     },
//     removeItemFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item._id !== action.payload.id
//       );
//       state.length = state.items.length;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addItemToCartAsync.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(addItemToCartAsync.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//         state.length = state.items.length;
//         state.status = "succeeded";
//       })
//       .addCase(addItemToCartAsync.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || "Failed to add item to cart";
//       });
//   },
// });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      state.length = state.items.length;
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload.id
      );
      state.length = state.items.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        const newItem = action.payload.cart; // Access the updated or new cart item from the payload
        const existingIndex = state.items.findIndex(
          (item) => item._id === newItem._id
        );

        if (existingIndex >= 0) {
          // If the item already exists, update it
          state.items[existingIndex] = newItem;
        } else {
          // If the item does not exist, add it to the cart
          state.items.push(newItem);
        }

        state.length = state.items.length;
        state.status = "succeeded";
      })
      .addCase(addItemToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add item to cart";
      });
  },
});

// Export actions
export const { setCart, removeItemFromCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Initial state
// const initialState = {
//   items: [],
//   length: 0,
//   status: "idle", // Track loading state
//   error: null,
// };

// // Async thunk for adding an item to the cart
// export const addItemToCartAsync = createAsyncThunk(
//   "cart/addItemToCartAsync",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/v1/cart/create-cart", payload);
//       return response.data.cart;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Regular reducers
//     setCart: (state, action) => {
//       // Using a Set to ensure uniqueness
//       const itemsSet = new Set(action.payload.map((item) => item._id));
//       state.items = Array.from(itemsSet).map((id) =>
//         action.payload.find((item) => item._id === id)
//       );
//       state.length = state.items.length;
//     },
//     removeItemFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item._id !== action.payload.id
//       );
//       state.length = state.items.length;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addItemToCartAsync.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(addItemToCartAsync.fulfilled, (state, action) => {
//         // Ensure uniqueness when adding new item
//         if (!state.items.some((item) => item._id === action.payload._id)) {
//           state.items.push(action.payload);
//         }
//         state.length = state.items.length;
//         state.status = "succeeded";
//       })
//       .addCase(addItemToCartAsync.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || "Failed to add item to cart";
//       });
//   },
// });

// // Export actions
// export const { setCart, removeItemFromCart } = cartSlice.actions;

// // Export reducer
// export default cartSlice.reducer;
