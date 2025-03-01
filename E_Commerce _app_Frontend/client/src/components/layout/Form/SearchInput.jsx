/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useCallback, useEffect, useRef } from "react";
// import { useSearch } from "../../../context/search.js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";
// import styles from "../../../styles/SearchInput.module.css";
// import { useAuth } from "../../../context/auth.jsx";
// export default function SearchInput() {
//   const [auth, setAuth] = useAuth();
//   const [values, setValues] = useSearch();
//   const [dropdownValue, setDropdownValue] = useState({
//     results: [],
//   });
//   const [debounceTimer, setDebounceTimer] = useState(null);
//   const [query, setQuery] = useState(values.query);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);
//   const [pastSearchedData, setPastSearchedData] = useState([]);
//   const [pastProductSearchedData, setPastProductSearchedData] = useState([]);
//   const [isFocused, setIsFocused] = useState(false);

//   const fetchSearchResults = useCallback(async (value) => {
//     try {
//       const { data } = await axios.get(`/api/v1/product/search/${value}`);
//       ////console.log(data);

//       setDropdownValue({ results: data });
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { value } = e.target;
//     setQuery(value);
//     setValues({ ...values, query: value });

//     if (debounceTimer) {
//       clearTimeout(debounceTimer);
//     }

//     setDebounceTimer(
//       setTimeout(() => {
//         fetchSearchResults(value);
//       }, 100)
//     );
//   };

//   const handleItemClick = async (search) => {
//     ////console.log("search", search);
//     setQuery(search);
//     setDropdownValue({ results: [] });
//     const { data } = await axios.get(
//       `/api/v1/product/related-search/${search}`
//     );
//     setValues({ ...values, results: data, query: search });
//     const { pastData } = await axios.post(
//       `/api/v1/past-search/insert-past-search/`,
//       { search: search, userId: auth.user._id }
//     );
//     fetchPastSearchData();
//     navigate("/Search");
//   };

//   const handleClear = (e) => {
//     e.preventDefault();
//     setQuery("");
//     setValues({ ...values, query: "" });
//     setIsFocused(true);
//     inputRef.current.focus();
//     // setDropdownValue({ results: [] });
//   };

//   const handleKeyDown = (e) => {
//     if (dropdownValue.results.length > 0) {
//       if (e.key === "ArrowDown") {
//         setSelectedIndex((prevIndex) =>
//           prevIndex < dropdownValue.results.length - 1
//             ? prevIndex + 1
//             : prevIndex
//         );
//       } else if (e.key === "ArrowUp") {
//         setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
//       } else if (e.key === "Enter" && selectedIndex >= 0) {
//         handleItemClick(dropdownValue.results[selectedIndex].search);
//       }
//     }
//   };

//   useEffect(() => {
//     if (selectedIndex >= 0 && dropdownRef.current) {
//       const selectedItem = dropdownRef.current.children[selectedIndex];
//       if (selectedItem) {
//         selectedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
//         setQuery(selectedItem.innerText);
//       }
//     }
//   }, [selectedIndex]);

//   useEffect(() => {
//     fetchPastSearchData();
//   }, [auth?.user?._id]);
//   const fetchPastSearchData = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/past-search/get-past-search/${auth?.user?._id}`
//       );
//       if (data && data?.success) {
//         setPastSearchedData(data?.pastSearchResults);
//       }
//     } catch (error) {
//       console.error("Error fetching past searches:", error);
//     }
//   };

//   const handlerOnRemovePastSearch = async (search) => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/past-search/remove-past-search/${search}/${auth.user._id}`
//       );
//       if (data && data?.success) {
//         setPastSearchedData((prevData) =>
//           prevData.filter((item) => item.search !== search)
//         );
//       }
//     } catch (error) {
//       console.error("Error removing past search:", error);
//     }
//   };
//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = (e) => {
//     const relatedTarget = e.relatedTarget;
//     if (
//       relatedTarget &&
//       ((dropdownRef && dropdownRef?.current?.contains(relatedTarget)) ||
//         e.target === relatedTarget)
//     ) {
//       return;
//     }
//     setTimeout(() => setIsFocused(false), 200);
//   };

//   useEffect(() => {
//     fetchPastProductSearchData();
//   }, [auth?.user?._id]);
//   const fetchPastProductSearchData = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/past-product-search/get-past-product-search/${auth?.user?._id}`
//       );
//       if (data && data?.success) {
//         setPastProductSearchedData(data?.pastproductSearchResults);
//       }
//     } catch (error) {
//       console.error("Error fetching past product searches:", error);
//     }
//   };

//   // return (
//   //   <div className={styles.searchContainer}>
//   //     <div className={styles.searchWrapper} role="search">
//   //       <input
//   //         ref={inputRef}
//   //         className={styles.searchInput}
//   //         type="search"
//   //         placeholder="Search"
//   //         aria-label="Search"
//   //         value={query}
//   //         onChange={handleChange}
//   //         onKeyDown={handleKeyDown}
//   //         onFocus={handleFocus}
//   //         onBlur={handleBlur}
//   //       />
//   //       <div
//   //         className={styles.iconContainer}
//   //         onClick={query ? handleClear : null}
//   //       >
//   //         {query ? (
//   //           <ClearIcon className={styles.icon} />
//   //         ) : (
//   //           <SearchIcon className={styles.icon} />
//   //         )}
//   //       </div>
//   //       {query && dropdownValue.results.length > 0 && (
//   //         <div
//   //           ref={dropdownRef}
//   //           className={`${styles.searchDropdown} ${
//   //             dropdownValue.results.length ? "" : "hidden"
//   //           }`}
//   //         >
//   //           {dropdownValue.results.map((el, i) => (
//   //             <div
//   //               key={i}
//   //               className={`${styles.searchItem} ${
//   //                 selectedIndex === i ? styles.selected : ""
//   //               }`}
//   //               onClick={() => handleItemClick(el.matchedTerm)}
//   //             >
//   //               <span>{el.matchedTerm}</span>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       )}
//   //       {!query && isFocused && pastSearchedData.length > 0 && (
//   //         <div
//   //           ref={dropdownRef}
//   //           className={`${styles.searchDropdown} ${
//   //             (query || isFocused) && pastSearchedData.length > 0
//   //               ? ""
//   //               : "hidden"
//   //           }`}
//   //         >
//   //           {pastSearchedData.map((item) => (
//   //             <div
//   //               key={item._id}
//   //               className={`${styles.pastSearchItem} ${
//   //                 query && item.search.toLowerCase() === query.toLowerCase()
//   //                   ? styles.highlighted
//   //                   : ""
//   //               }`}
//   //               onClick={(e) => {
//   //                 e.stopPropagation();
//   //                 handleItemClick(item.search);
//   //               }}
//   //             >
//   //               <span className={styles.pastitem}>{item.search}</span>
//   //               {/* <ClearIcon
//   //                 className={styles.removeIcon}
//   //                 onClick={(e) => {
//   //                   e.stopPropagation();
//   //                   handlerOnRemovePastSearch(item.search);
//   //                 }}
//   //               /> */}
//   //               <ClearIcon
//   //                 className={styles.removeIcon}
//   //                 onMouseDown={(e) => e.preventDefault()}
//   //                 onClick={(e) => {
//   //                   e.stopPropagation();
//   //                   handlerOnRemovePastSearch(item.search);
//   //                 }}
//   //               />
//   //             </div>
//   //           ))}
//   //         </div>
//   //       )}
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className={styles.searchContainer}>
//       <div className={styles.searchWrapper} role="search">
//         <input
//           ref={inputRef}
//           className={styles.searchInput}
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//           value={query}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           onFocus={handleFocus}
//           // onBlur={handleBlur}
//         />
//         <div
//           className={styles.iconContainer}
//           onClick={query ? handleClear : null}
//         >
//           {query ? (
//             <ClearIcon className={styles.icon} />
//           ) : (
//             <SearchIcon className={styles.icon} />
//           )}
//         </div>
//         {query && dropdownValue.results.length > 0 && (
//           <div
//             ref={dropdownRef}
//             className={`${styles.searchDropdown} ${
//               dropdownValue.results.length ? "" : "hidden"
//             }`}
//           >
//             {dropdownValue.results.map((el, i) => (
//               <div
//                 key={i}
//                 className={`${styles.searchItem} ${
//                   selectedIndex === i ? styles.selected : ""
//                 }`}
//                 onClick={() => handleItemClick(el.matchedTerm)}
//               >
//                 <span>{el.matchedTerm}</span>
//               </div>
//             ))}
//           </div>
//         )}
//         {!query && isFocused && (
//           <div ref={dropdownRef} className={styles.pastsearchDropdown}>
//             {pastProductSearchedData.length > 0 && (
//               <div className={styles.productSearchContainer}>
//                 {pastProductSearchedData?.map((item, index) => (
//                   <div key={index} className={styles.productSearchItem}>
//                     <img
//                       src={`/api/v1/product/product-photo/${item?.product?._id}`}
//                       alt={item?.product?.name}
//                       className={styles.productImage}
//                     />
//                     <span className={styles.productName}>
//                       {item?.product?.name}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {pastSearchedData.length > 0 && (
//               <div className={styles.pastSearchContainer}>
//                 {pastSearchedData.map((item) => (
//                   <div
//                     key={item._id}
//                     className={`${styles.pastSearchItem} ${
//                       query && item.search.toLowerCase() === query.toLowerCase()
//                         ? styles.highlighted
//                         : ""
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleItemClick(item.search);
//                     }}
//                   >
//                     <span className={styles.pastitem}>{item.search}</span>
//                     <ClearIcon
//                       className={styles.removeIcon}
//                       onMouseDown={(e) => e.preventDefault()}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handlerOnRemovePastSearch(item.search);
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSearch } from "../../../context/search.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "../../../styles/SearchInput.module.css";
import { useAuth } from "../../../context/auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addPastProduct,
  removePastProduct,
} from "../../../features/pastProduct/pastProductSlice.js";
import Search from "antd/es/transfer/search.js";

const SearchInput = React.memo(({ isSearchFocused, onFocus, onBlur }) => {
  const dispatch = useDispatch();
  const pastProducts = useSelector((state) => state.pastProduct.pastProducts);

  const [auth, setAuth] = useAuth();
  const [values, setValues] = useSearch();
  const [isunknown, setIsUnknown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState({
    results: [],
  });
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [query, setQuery] = useState(values.query);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [pastSearchedData, setPastSearchedData] = useState([]);
  const [pastProductSearchedData, setPastProductSearchedData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const fetchSearchResults = useCallback(async (value) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${value}`
      );
      ////console.log(data);

      setDropdownValue({ results: data });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setValues({ ...values, query: value });

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setDebounceTimer(
      setTimeout(() => {
        fetchSearchResults(value);
      }, 100)
    );
  };

  const handleItemClick = async (search) => {
    ////console.log("search", search);

    ////console.log("clicked");
    ////console.log("dropdownValue", dropdownValue.results.length);
    setQuery(search);

    setDropdownValue({ results: [] });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/related-search/${search}`
    );
    setValues({ ...values, results: data, query: search });
    // const { pastData } = await axios.post(
    //   `/api/v1/past-search/insert-past-search/`,
    //   { search: search, userId: auth.user._id }
    // );
    // fetchPastSearchData();
    if (auth.user?._id) {
      const { pastData } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/past-search/insert-past-search/`,
        { search: search, userId: auth.user._id }
      );
      fetchPastSearchData(); // Fetch past searches after inserting the new search
    }
    ////console.log("data", data);
    // navigate("/Search", { state: { searchValue: search ,isunknown:isUnknownValue} });
    const isUnknownValue = data.length === 0;
    setIsUnknown(isUnknownValue);
    navigate("/Search", {
      state: {
        searchValue: search,
        isunknown: isUnknownValue,
      },
    });
  };

  const handleClear = (e) => {
    e.preventDefault();
    setQuery("");
    setValues({ ...values, query: "" });
    setIsFocused(true);
    inputRef.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      ////console.log("enter press here! ", e.target.value);
      handleItemClick(e.target.value);
    }
  };
  const handleKeyDown = (e) => {
    if (dropdownValue.results.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < dropdownValue.results.length - 1
            ? prevIndex + 1
            : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        handleItemClick(dropdownValue.results[selectedIndex].matchedTerm);
      }
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedItem = dropdownRef.current.children[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
        setQuery(selectedItem.innerText);
      }
    }
  }, [selectedIndex]);

  // useEffect(() => {
  //   if (auth?.accessToken) {
  //     fetchPastSearchData();
  //   }
  // }, [auth?.accessToken]);

  const fetchPastSearchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/past-search/get-past-search/${auth?.user?._id}`
      );
      if (data && data?.success) {
        setPastSearchedData(data?.pastSearchResults);
      }
    } catch (error) {
      console.error("Error fetching past searches:", error);
    }
  };

  const handlerOnRemovePastSearch = async (search) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/past-search/remove-past-search/${search}/${auth.user._id}`
      );
      if (data && data?.success) {
        setPastSearchedData((prevData) =>
          prevData.filter((item) => item.search !== search)
        );
      }
    } catch (error) {
      console.error("Error removing past search:", error);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    const relatedTarget = e.relatedTarget;
    if (
      relatedTarget &&
      ((dropdownRef && dropdownRef?.current?.contains(relatedTarget)) ||
        e.target === relatedTarget)
    ) {
      return;
    }
    setTimeout(() => setIsFocused(false), 200);
    // onBlur();
  };

  // useEffect(() => {
  //   ////console.log("useEffect called with auth?.accessToken:", auth?.accessToken);
  //   if (auth?.accessToken) {
  //     fetchPastProductSearchData();
  //   }
  // }, [auth?.accessToken]);

  useEffect(() => {
    if (auth?.accessToken) {
      fetchPastSearchData();
      fetchPastProductSearchData();
    }
  }, [auth?.accessToken]);

  const fetchPastProductSearchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/past-product-search/get-past-product-search/${auth?.user?._id}`
      );
      if (data && data?.success) {
        setPastProductSearchedData(data?.pastproductSearchResults);
        // if (!pastProducts.some((item) => item._id === data._id)) {
        //   dispatch(addPastProduct(data?.pastproductSearchResults));
        // }
        ////console.log(pastProducts);
        const existingIds = new Set(pastProducts?.map((item) => item._id));
        ////console.log(existingIds);
        // Filter out new items that are not already in pastProducts
        const newProducts = data.pastproductSearchResults.filter(
          (item) => !existingIds.has(item._id)
        );
        ////console.log("newProducts", newProducts);
        ////console.log("data", data);

        if (newProducts.length > 0) {
          dispatch(addPastProduct(newProducts));
        }
      }
    } catch (error) {
      console.error("Error fetching past product searches:", error);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper} role="search">
        <input
          ref={inputRef}
          className={styles.searchInput}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div
          className={styles.iconContainer}
          onClick={query ? handleClear : null}
        >
          {query ? (
            <ClearIcon className={styles.icon} />
          ) : (
            <SearchIcon className={styles.icon} />
          )}
        </div>
        {query && dropdownValue.results.length > 0 && (
          <div
            ref={dropdownRef}
            className={`${styles.searchDropdown} ${
              dropdownValue.results.length ? "" : "hidden"
            }`}
          >
            {dropdownValue.results.map((el, i) => (
              <div
                key={i}
                className={`${styles.searchItem} ${
                  selectedIndex === i ? styles.selected : ""
                }`}
                onClick={() => handleItemClick(el.matchedTerm)}
                onKeyDown={(e) => {
                  ////console.log("e", e);
                  if (e.key === "Enter") {
                    handleItemClick(el.matchedTerm);
                  }
                }}
                tabIndex={0}
              >
                <span>{el.matchedTerm}</span>
              </div>
            ))}
          </div>
        )}

        {!query &&
          isFocused &&
          (pastProductSearchedData.length > 0 ||
            pastSearchedData.length > 0) && (
            // <div ref={dropdownRef} className={styles.pastsearchDropdown}>
            //   {pastProductSearchedData.length > 0 && (
            //     <div className={styles.productSearchContainer}>
            //       {pastProductSearchedData?.map((item, index) => (
            //         <div
            //           key={index}
            //           className={styles.productSearchItem}
            //           onClick={() => handleItemClick(item?.product?.name)}
            //         >
            //           <img
            //             src={`/api/v1/product/product-photo/${item?.product?._id}`}
            //             alt={item?.product?.name}
            //             className={styles.productImage}
            //           />
            //           <span className={styles.productName}>
            //             {item?.product?.name}
            //           </span>
            //         </div>
            //       ))}
            //     </div>
            //   )}
            //   {pastSearchedData.length > 0 && (
            //     <div className={styles.pastSearchContainer}>
            //       {pastSearchedData.map((item) => (
            //         <div
            //           key={item._id}
            //           className={`${styles.pastSearchItem} ${
            //             query && item.search.toLowerCase() === query.toLowerCase()
            //               ? styles.highlighted
            //               : ""
            //           }`}
            //           onClick={(e) => {
            //             e.stopPropagation();
            //             handleItemClick(item.search);
            //           }}
            //         >
            //           <span className={styles.pastitem}>{item.search}</span>
            //           <ClearIcon
            //             className={styles.removeIcon}
            //             onMouseDown={(e) => e.preventDefault()}
            //             onClick={(e) => {
            //               e.stopPropagation();
            //               handlerOnRemovePastSearch(item.search);
            //             }}
            //           />
            //         </div>
            //       ))}
            //     </div>
            //   )}
            // </div>
            <div ref={dropdownRef} className={styles.pastsearchDropdown}>
              <div className={styles.searchSectionsContainer}>
                {pastProductSearchedData.length > 0 && (
                  <div className={styles.productSearchContainer}>
                    {pastProductSearchedData?.map((item, index) => (
                      <div
                        key={index}
                        className={styles.productSearchItem}
                        onClick={() => handleItemClick(item?.product?.name)}
                      >
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item?.product?._id}`}
                          alt={item?.product?.name}
                          className={styles.productImage}
                        />
                        <span className={styles.productName}>
                          {item?.product?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {pastSearchedData.length > 0 && (
                  <div
                    className={`${styles.pastSearchContainer} ${
                      pastProductSearchedData.length === 0
                        ? styles.noProductSearchContainer
                        : styles.pastSearchContainer
                    }`}
                  >
                    {pastSearchedData.map((item) => (
                      <div
                        key={item._id}
                        className={`${styles.pastSearchItem} ${
                          query &&
                          item.search.toLowerCase() === query.toLowerCase()
                            ? styles.highlighted
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item.search);
                        }}
                      >
                        <span className={styles.pastitem}>{item.search}</span>
                        <ClearIcon
                          className={styles.removeIcon}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlerOnRemovePastSearch(item.search);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
});

export default SearchInput;
