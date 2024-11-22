/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Checkbox, Radio } from "antd";
// import generatePriceRanges, { Prices } from "../components/Prices";
import generatePriceRanges from "../components/Prices";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import styles from "../styles/SearchFilter.module.css";
import styles from "../styles/Search.module.css";
import ScrollableFilterChips from "./ScrollableFilterChips";
import { useMediaQuery } from "@mui/material";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import CustomerRatting from "../frontendUtil/CustomerRatting";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [values, setValues] = useSearch();

  const [price, setPrice] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);

  const [brands, setBrands] = useState([]);
  const [ram, setRAMs] = useState([]);
  const [color, setColors] = useState([]);
  const [size, setSizes] = useState([]);

  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [checkedSizes, setCheckedSizes] = useState([]);
  const [checkedRam, setCheckedRam] = useState([]);

  const [category, setCategory] = useState();
  const [subcategory, setSubcategoryName] = useState();

  const [initialResults, setInitialResults] = useState([]);

  const [previousResults, setPreviousResults] = useState([]);

  const [valuequery, setvaluequery] = useState();
  //console.log(checkedRam);
  //console.log(checkedBrands);
  //console.log(checkedColors);
  const handleFilter = (value, id, type) => {
    let updatedList = [];

    switch (type) {
      case "brand":
        updatedList = value
          ? [...checkedBrands, id]
          : checkedBrands.filter((c) => c !== id);
        setCheckedBrands(updatedList);
        break;
      case "color":
        updatedList = value
          ? [...checkedColors, id]
          : checkedColors.filter((c) => c !== id);
        setCheckedColors(updatedList);
        break;
      case "size":
        updatedList = value
          ? [...checkedSizes, id]
          : checkedSizes.filter((c) => c !== id);
        setCheckedSizes(updatedList);
        break;
      case "ram":
        updatedList = value
          ? [...checkedRam, id]
          : checkedRam.filter((c) => c !== id);
        setCheckedRam(updatedList);
        break;
      default:
        break;
    }
  };

  const resetHandler = () => {
    setCheckedBrands([]);
    setCheckedColors([]);
    setCheckedSizes([]);
    setCheckedRam([]);
    setSelectedPriceRange([]);
    setSelectedRating(null);
    setPreviousResults([]);
    setValues({ ...values, results: initialResults });
  };
  //console.log("hello", values?.results?.length);
  useEffect(() => {
    //console.log("values?.results", values);
    if (values?.results) {
      const newCategory = values?.results[0]?.category;
      const newSubcategoryName = values?.results[0]?.subcategoryName;
      if (
        (newCategory === category && newSubcategoryName === subcategory) ||
        values?.results?.length === 0
      ) {
        return;
      }
      setInitialResults(values.results);
      const extractedRAMs = values.results
        .flatMap((product) => (product.ram[0] ? product.ram[0].split(",") : []))
        .map((ram) => ram.trim())
        .filter((ram, index, self) => self.indexOf(ram) === index)
        .map((ram) => ({ id: uuidv4(), name: ram }));

      const extractedColors = values.results
        .flatMap((product) => product.color[0]?.split(","))
        .map((color) => color?.trim())
        .filter((color, index, self) => self.indexOf(color) === index)
        .map((color) => ({ id: uuidv4(), name: color }));

      const extractedSizes = values.results
        .flatMap((product) =>
          product.size[0] ? product.size[0]?.split(",") : []
        )
        .map((size) => size.trim())
        .filter((size, index, self) => self.indexOf(size) === index)
        .map((size) => ({ id: uuidv4(), name: size }));
      // const extractedBrands = values.results.map((product) => ({
      //   id: uuidv4(),
      //   name: product.brand,
      // }));
      const extractedBrands = Array.from(
        new Set(values.results.map((product) => product.brand))
      ).map((brand) => ({
        id: uuidv4(),
        name: brand,
      }));
      //console.log("again", extractedBrands);
      const extractedPriceValues = values.results.map(
        (product) => product.price
      );
      // const extractedColors = colorArray.map((color) => ({
      //   id: uuidv4(),
      //   name: color,
      // }));

      //console.log("here is the", values.results);
      const categoryy = values?.results[0]?.category;
      const subcategoryName = values?.results[0]?.subcategoryName;
      // const extractedSubcategories = Array.from(
      //   new Set(
      //     values.results.map((product) =>
      //       JSON.stringify({
      //         // id: product._id,
      //         name: product.subcategoryName,
      //       })
      //     )
      //   )
      // ).map((subcategory) => JSON.parse(subcategory));
      const extractedSubcategories = Array.from(
        new Set(values.results.map((product) => product.subcategoryName))
      );

      //console.log("Extracted subcategories:", extractedSubcategories);
      setPrice(extractedPriceValues);
      const ranges = generatePriceRanges(extractedPriceValues);
      setPriceRanges(ranges);
      setBrands(extractedBrands);
      setColors(extractedColors);
      setRAMs(extractedRAMs);
      setSizes(extractedSizes);
      setCategory(categoryy);
      // setSubcategoryName(subcategoryName);
      setSubcategoryName(extractedSubcategories);
    }
  }, [values?.query]);
  const [newReview, setNewReview] = useState({
    username: "",
    rating: 0,
    comment: "",
  });

  //console.log("size", size);

  const fetchFilteredProducts = async (isUnchecking = false) => {
    try {
      //console.log("checkedBrands:", checkedBrands);
      //console.log("Brands:", brands);
      //console.log("isUnchecking:", isUnchecking);
      const filteredBrands = brands
        .filter((b) => checkedBrands.includes(b.id))
        .map((b) => b.name);

      const filteredColors = color
        .filter((clr) => checkedColors.includes(clr.id))
        .map((clr) => clr.name);

      const filteredSizes = size
        .filter((s) => checkedSizes.includes(s.id))
        .map((s) => s.name);

      const filteredRams = ram
        .filter((r) => checkedRam.includes(r.id))
        .map((r) => r.name);

      if (isUnchecking) {
        //console.log("previousResults", previousResults);
        //console.log("values", values);
        setValues({ ...values, results: initialResults });
        return;
      }
      //console.log("selectedPriceRange", selectedPriceRange);
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-products`, {
        brands: filteredBrands,
        colors: filteredColors,
        sizes: filteredSizes,
        rams: filteredRams,
        rating: selectedRating,
        priceRange: selectedPriceRange,
        category: category,
        subcategory: subcategory,
      });
      setValues({ ...values, results: data });
      setPreviousResults(values.results);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const fetchFilteredProductsForChips = async (isUnchecking = false) => {
    try {
      //console.log("checkedBrands:", checkedBrands);
      //console.log("Brands:", brands);
      const filteredBrands = brands
        .filter((b) => checkedBrands.includes(b.name))
        .map((b) => b.name);

      const filteredColors = color
        .filter((clr) => checkedColors.includes(clr.name))
        .map((clr) => clr.name);

      const filteredSizes = size
        .filter((s) => checkedSizes.includes(s.name))
        .map((s) => s.name);

      const filteredRams = ram
        .filter((r) => checkedRam.includes(r.name))
        .map((r) => r.name);

      if (isUnchecking) {
        // setValues({ ...values, results: previousResults });
        setValues({ ...values, results: initialResults });
        return;
      }
      //console.log("selectedPriceRange", selectedPriceRange);
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-products`, {
        brands: filteredBrands,
        colors: filteredColors,
        sizes: filteredSizes,
        rams: filteredRams,
        rating: selectedRating,
        priceRange: selectedPriceRange,
        category: category,
        subcategory: subcategory,
      });
      setValues({ ...values, results: data });
      setPreviousResults(values.results);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    const isFiltering =
      checkedBrands.length > 0 ||
      checkedColors.length > 0 ||
      checkedRam.length > 0 ||
      checkedSizes.length > 0 ||
      selectedPriceRange.length > 0 ||
      selectedRating != null;
    //console.log("selectedPriceRange here", selectedPriceRange);
    if (isFiltering) {
      if (isMobile) {
        fetchFilteredProductsForChips();
      } else {
        fetchFilteredProducts();
      }
    } else if (previousResults.length > 0) {
      if (isMobile) {
        fetchFilteredProductsForChips(true);
      } else {
        fetchFilteredProducts(true);
      }
    }
  }, [
    checkedBrands,
    checkedColors,
    checkedSizes,
    checkedRam,
    selectedRating,
    selectedPriceRange,
    isMobile,
  ]);

  const handleChipClick = (filter) => {
    const { id, name, type } = filter;
    //console.log("name", name);
    switch (type) {
      case "brand":
        setCheckedBrands((prev) =>
          prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
        );
        break;
      case "color":
        setCheckedColors((prev) =>
          prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
        );
        break;
      case "size":
        setCheckedSizes((prev) =>
          prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
        );
        break;
      case "ram":
        setCheckedRam((prev) =>
          prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]
        );
        break;
      case "price":
        // const priceRange = name.split("-").map(Number);
        const priceRange = name.split("to").map(Number);
        setSelectedPriceRange(priceRange);
        break;
      default:
        break;
    }
  };

  const handleResetFilters = () => {
    setCheckedBrands([]);
    setCheckedColors([]);
    setCheckedSizes([]);
    setCheckedRam([]);
    setSelectedPriceRange([]);
    setSelectedRating(null);
    setPreviousResults([]);
    setValues({ ...values, results: initialResults });
  };
  const filterOptions = {
    brand: brands,
    color: color,
    ram: ram,
    size: size,
    // price: Prices,
    price: priceRanges,
  };

  //console.log("values", values);

  //console.log("location.state.isunknown", location.state.isunknown);
  //console.log("location.state.searchValue", location.state.searchValue);
  // Function to find the closest match
  const getClosestMatch = (searchArray, target) => {
    let closestMatch = "";
    let highestSimilarity = 0;

    // Split each string by commas to get individual terms
    const terms = searchArray.flatMap((item) => item.split(","));

    terms.forEach((term) => {
      const similarity = getSimilarity(term, target);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        closestMatch = term;
      }
    });

    return closestMatch;
  };

  // Simple similarity function
  const getSimilarity = (str1, str2) => {
    let matches = 0;
    const length = Math.max(str1.length, str2.length);

    for (let i = 0; i < length; i++) {
      if (str1[i] === str2[i]) {
        matches++;
      }
    }

    return matches / length;
  };
  return (
    <Layout title={"Search results"}>
      <div className="container-fluid">
        <div className="row">
          <MDBContainer>
            <div className={styles.titleContainer}>
              {/* <h1 className={styles.title}>Search Results</h1> */}
              {/* {values?.results?.length !== 0 &&
                !values?.results.some(
                  (p) => p.name === location.state.searchValue
                ) && (
                  <div>
                    {`Showing results for `}
                    <span className={styles.showingresults}>
                      {values?.results[0]?.name}
                    </span>
                    {` instead of `}
                    <span className={styles.showinginsteadresults}>
                      {location.state.searchValue}
                    </span>
                  </div>
                )} */}
              {/* {values?.results?.length !== 0 &&
                !values?.results.some((p) =>
                  p.search.includes(location.state.searchValue)
                ) && (
                  <div>
                    {`Showing results for `}
                    <span className={styles.showingresults}>
                      {values?.results[0]?.name}
                    </span>
                    {` instead of `}
                    <span className={styles.showinginsteadresults}>
                      {location.state.searchValue}
                    </span>
                  </div>
                )} */}
              {/* {values?.results?.length !== 0 &&
                !values?.results.some((p) =>
                  p.search.includes(location.state.searchValue)
                ) && (
                  <div>
                    {`Showing results for `}
                    <span className={styles.showingresults}>
                      {getClosestMatch(
                        values?.results[0]?.search || [],
                        location.state.searchValue
                      )}
                    </span>
                    {` instead of `}
                    <span className={styles.showinginsteadresults}>
                      {location.state.searchValue}
                    </span>
                  </div>
                )} */}

              {values?.results?.length !== 0 &&
                (() => {
                  // Split search terms by commas
                  const terms = values?.results[0]?.search.flatMap((item) =>
                    item.split(",")
                  );

                  // Check if there's an exact match
                  const exactMatch = terms.includes(location.state.searchValue);

                  // Only show the message if there’s no exact match
                  if (!exactMatch) {
                    return (
                      <div>
                        {`Showing results for `}
                        <span className={styles.showingresults}>
                          {getClosestMatch(terms, location.state.searchValue)}
                        </span>
                        {` instead of `}
                        <span className={styles.showinginsteadresults}>
                          {location.state.searchValue}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}
              {values?.results?.length === 0 && !location.state.isunknown && (
                <div>No Product Found</div>
              )}
              {values?.results?.length === 0 && location.state.isunknown && (
                <div>
                  {`No results for `}
                  <span className={styles.showingresults}>
                    {location.state.searchValue}.
                  </span>
                  <span>
                    {`Try checking your spelling or use more general terms`}
                  </span>
                </div>
              )}
            </div>

            {/* Mobile view: ScrollableFilterChips */}
            {isMobile && !location.state.isunknown && (
              <ScrollableFilterChips
                filters={[
                  { id: "price", name: "Price", type: "price" },
                  { id: "brand", name: "Brand", type: "brand" },
                  { id: "color", name: "Color", type: "color" },
                  { id: "size", name: "Size", type: "size" },
                  { id: "ram", name: "RAM", type: "ram" },
                ]}
                filterOptions={filterOptions}
                onChipClick={handleChipClick}
                onResetFilters={handleResetFilters}
              />
            )}

            <MDBRow className={`mb-4 ${styles.cardContainer}`}>
              {!isMobile && !location.state.isunknown && (
                <MDBCol lg="3">
                  <MDBCard
                    className="mb-4 mb-lg-0"
                    style={{ border: "1px", borderRadius: "15px" }}
                  >
                    <MDBCardBody
                      className="p-0"
                      style={{ backgroundColor: "#eee" }}
                    >
                      <MDBListGroup flush className="rounded-3">
                        <MDBListGroup flush className="rounded-3">
                          <MDBListGroupItem>
                            <h4 className="text-center mt-4">
                              Filter By Price
                            </h4>
                            {/* <div className="d-flex flex-column">
                              <Radio.Group
                                value={selectedPriceRange}
                                onChange={(e) =>
                                  setSelectedPriceRange(e.target.value)
                                }
                              >
                                {Prices?.map((p) => (
                                  <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                  </div>
                                ))}
                              </Radio.Group>
                            </div> */}
                            <div className="d-flex flex-column">
                              <Radio.Group
                                value={selectedPriceRange}
                                onChange={(e) =>
                                  setSelectedPriceRange(e.target.value)
                                }
                              >
                                {priceRanges.map((range) => (
                                  <div key={range._id}>
                                    <Radio value={range.array}>
                                      {range.name}
                                    </Radio>
                                  </div>
                                ))}
                              </Radio.Group>
                            </div>
                          </MDBListGroupItem>
                          <MDBListGroupItem>
                            <h4 className="text-center mt-4">
                              Filter By Brand
                            </h4>
                            <div className="d-flex flex-column">
                              {brands?.map((b) => (
                                <Checkbox
                                  key={b.id}
                                  checked={checkedBrands.includes(b.id)}
                                  onChange={(e) => {
                                    handleFilter(
                                      e.target.checked,
                                      b.id,
                                      "brand"
                                    );
                                    //console.log(e.target);
                                  }}
                                >
                                  {b.name}
                                </Checkbox>
                              ))}
                            </div>
                          </MDBListGroupItem>
                          <MDBListGroupItem>
                            <h4 className="text-center mt-4">
                              Filter By Color
                            </h4>
                            <div className="d-flex flex-column">
                              {color?.map((c) => (
                                <Checkbox
                                  key={c.id}
                                  checked={checkedColors.includes(c.id)}
                                  onChange={(e) =>
                                    handleFilter(
                                      e.target.checked,
                                      c.id,
                                      "color"
                                    )
                                  }
                                >
                                  {c.name}
                                </Checkbox>
                              ))}
                            </div>
                          </MDBListGroupItem>

                          {ram.length > 0 && (
                            <MDBListGroupItem>
                              <h4 className="text-center mt-4">
                                Filter By RAM
                              </h4>
                              <div className="d-flex flex-column">
                                {ram?.map((r) => (
                                  <Checkbox
                                    key={r.id}
                                    checked={checkedRam.includes(r.id)}
                                    onChange={(e) =>
                                      handleFilter(
                                        e.target.checked,
                                        r.id,
                                        "ram"
                                      )
                                    }
                                  >
                                    {r.name}
                                  </Checkbox>
                                ))}
                              </div>
                            </MDBListGroupItem>
                          )}

                          {size.length > 0 && (
                            <MDBListGroupItem>
                              <h4 className="text-center mt-4">
                                Filter By Size
                              </h4>
                              <div className="d-flex flex-column">
                                {size?.map((s) => (
                                  <Checkbox
                                    key={s.id}
                                    checked={checkedSizes.includes(s.id)}
                                    onChange={(e) =>
                                      handleFilter(
                                        e.target.checked,
                                        s.id,
                                        "size"
                                      )
                                    }
                                  >
                                    {s.name}
                                  </Checkbox>
                                ))}
                              </div>
                            </MDBListGroupItem>
                          )}

                          <MDBListGroupItem>
                            <div className="d-flex flex-column">
                              <button
                                className="btn btn-danger mt-2"
                                onClick={resetHandler}
                              >
                                RESET FILTERS
                              </button>
                            </div>
                          </MDBListGroupItem>
                        </MDBListGroup>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              )}

              {/* Card Section */}
              <MDBCol lg={isMobile ? "12" : "9"}>
                <MDBRow className={styles.cardGrid}>
                  {values?.results.map((p) => (
                    <MDBCol
                      xs="6"
                      sm="6"
                      md={isMobile ? "6" : "4"} // Adjust for mobile: 6 = two cards per row
                      className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
                      key={p._id}
                    >
                      <Link className={styles.cardText}>
                        <MDBCard
                          className={styles.card}
                          onClick={(e) => {
                            e.preventDefault();
                            // navigate(`/product/${p.slug}`);
                            window.open(`/product/${p.slug}`, "_blank");
                          }}
                        >
                          <MDBCardImage
                            src={`/api/v1/product/product-photo/${p._id}`}
                            position="top"
                            alt={`${p.name} image`}
                            className={styles.cardImage}
                          />
                          <MDBCardBody className={styles.cardBody}>
                            <MDBCardText className={styles.productname}>
                              {p.name}
                            </MDBCardText>
                            <MDBCardText>
                              {p.description.substring(0, 30)}...
                            </MDBCardText>
                            {
                              <MDBCardText className={styles.customerratting}>
                                <CustomerRatting ratings={p?.reviews} />
                              </MDBCardText>
                            }
                            <MDBCardText>
                              {p.specialDayTag === "true" &&
                                p.primestartDate &&
                                p.primeendDate &&
                                new Date() >= new Date(p.primestartDate) &&
                                new Date() <= new Date(p.primeendDate) && (
                                  <p className={styles.primeDayTag}>
                                    Prime Day Deal
                                  </p>
                                )}
                            </MDBCardText>
                            <MDBCardText>
                              {/* <p className={styles.currentPriceTag}>
                                <span className={styles.currentDollar}>₹</span>
                                <span className={styles.currentPrice}>
                                  {p.price}
                                </span>
                              </p> */}
                              <p className={styles.originalMRF}>
                                {p?.specialDayTag === "true" &&
                                  new Date() >= new Date(p.primestartDate) &&
                                  new Date() <= new Date(p.primeendDate) && (
                                    <>
                                      M.R.P.:{" "}
                                      <span className={styles.originalPrice}>
                                        ₹ {p?.price}
                                      </span>
                                    </>
                                  )}
                              </p>
                              <div className={styles.discountPrices}>
                                {p?.specialDayTag === "true" &&
                                  new Date() >= new Date(p.primestartDate) &&
                                  new Date() <= new Date(p.primeendDate) && (
                                    <p className={styles.discountPercentage}>
                                      - {p?.specialDayOffer}%
                                    </p>
                                  )}
                                <p className={styles.currentPriceTag}>
                                  <span className={styles.currentDollar}>
                                    ₹
                                  </span>
                                  {p?.specialDayTag === "true" &&
                                  new Date() >= new Date(p.primestartDate) &&
                                  new Date() <= new Date(p.primeendDate) ? (
                                    <span className={styles.currentPrice}>
                                      {(
                                        ((100 - p?.specialDayOffer) / 100) *
                                        p?.price
                                      ).toFixed(2)}
                                    </span>
                                  ) : (
                                    <span className={styles.currentPrice}>
                                      {p?.price}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </MDBCardText>
                          </MDBCardBody>
                          <MDBCardBody className={styles.footerText}>
                            <MDBCardText>
                              <p className={styles.cardFooter}>
                                Free Delivery By SnapCartss
                              </p>
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </Link>
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </Layout>
  );
}
