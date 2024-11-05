// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   pastProducts: [], // Initialize with an empty array
// };

// const pastProductSlice = createSlice({
//   name: "pastProduct",
//   initialState,
//   reducers: {
//     // Action to add a new past product
//     addPastProduct: (state, action) => {
//       // Ensure payload is an array
//       const newProducts = Array.isArray(action.payload)
//         ? action.payload
//         : [action.payload];


//       const existingIds = new Set(
//         state.pastProducts.map((product) => product._id)
//       );


//       const productsToAdd = newProducts.filter(
//         (product) => !existingIds.has(product._id)
//       );


//       state.pastProducts.push(...productsToAdd);
//     },
//     // Action to set the entire list of past products
//     setPastProducts: (state, action) => {
//       state.pastProducts = action.payload;
//     },
//     // Action to clear the past products (e.g., on logout)
//     clearPastProducts: (state) => {
//       state.pastProducts = [];
//     },
//     // Action to update a past product by ID
//     updatePastProduct: (state, action) => {
//       const index = state.pastProducts.findIndex(
//         (product) => product._id === action.payload._id
//       );
//       if (index !== -1) {
//         state.pastProducts[index] = action.payload;
//       }
//     },
//     // Action to remove a past product by ID
//     removePastProduct: (state, action) => {
//       state.pastProducts = state.pastProducts.filter(
//         (product) => product._id !== action.payload
//       );
//     },
//   },
// });

// // Export actions
// export const {
//   addPastProduct,
//   setPastProducts,
//   clearPastProducts,
//   updatePastProduct,
//   removePastProduct,
// } = pastProductSlice.actions;

// // Export the reducer
// export default pastProductSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastProducts: [],
};

const pastProductSlice = createSlice({
  name: "pastProduct",
  initialState,
  reducers: {
    addPastProduct: (state, action) => {
      const newProduct = action.payload;

      const existingIndex = state.pastProducts.findIndex(
        (product) => product._id === newProduct.product
      );


      if (existingIndex !== -1) {
        state.pastProducts.splice(existingIndex, 1);
      }


      state.pastProducts.push(...newProduct);
    },
    setPastProducts: (state, action) => {
      state.pastProducts = action.payload;
    },
    clearPastProducts: (state) => {
      state.pastProducts = [];
    },
    updatePastProduct: (state, action) => {
      const index = state.pastProducts.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.pastProducts[index] = action.payload;
      }
    },
    removePastProduct: (state, action) => {
      state.pastProducts = state.pastProducts.filter(
        (product) => product.product._id !== action.payload
      );
    },
  },
});

export const {
  addPastProduct,
  setPastProducts,
  clearPastProducts,
  updatePastProduct,
  removePastProduct,
} = pastProductSlice.actions;

export default pastProductSlice.reducer;
