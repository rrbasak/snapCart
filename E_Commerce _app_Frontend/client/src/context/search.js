// import { useState, useContext, createContext } from "react";
// const SearchContext = createContext();

// const SearchProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     keyword: "",
//     results: [],
//   });

//   return (
//     <SearchContext.Provider value={[auth, setAuth]}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// // custom hook
// const useSearch = () => useContext(SearchContext);

// export { useSearch, SearchProvider };




// context/search.js
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    results: [],
    query: "", 
  });

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
