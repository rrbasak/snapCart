/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import ReactImageMagnify from "react-image-magnify";
import styles from "../styles/ProductDetails.module.css";
import CustomerRatting from "../frontendUtil/CustomerRatting";
import Divider from "@mui/material/Divider";
import HorizontalScroll from "../frontendUtil/HorizontalScrollUtil";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LockIcon from "@mui/icons-material/Lock";
import AccordionUtil from "../frontendUtil/AccordionUtil";
import zIndex from "@mui/material/styles/zIndex";
import ReviewSection from "../components/commonComponents/ReviewSection";
import { Box, Rating, Typography, useMediaQuery } from "@mui/material";
import { useAuth } from "../context/auth";
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
import Options from "../components/commonComponents/Options";
import { formatDate2 } from "../frontendUtil/dateUtilfoAccordion";
import { useDispatch } from "react-redux";
import {
  addPastProduct,
  removePastProduct,
} from "../features/pastProduct/pastProductSlice";

export default function ProductDetails() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [cart, setCart] = useCart();
  const params = useParams();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("description");
  const [reviewLength, setReviewsLength] = useState(0);
  const [accordion, setAccordion] = useState(true);
  const [reviewsList, setReviewsList] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [productspec, setProductSpec] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [selectedspec, setSelectedSpec] = useState(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const dispatch = useDispatch();
  const handleSelect = (option) => {
    setSelectedSpec(option);
  };
  const ScrollToTop = () => {
    //console.log("Scroll");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return null;
  };

  const imageStyle = isMobileView
    ? {
        padding: "25px 60px",
      }
    : {};

  useEffect(() => {
    //console.log("Updated reviewsList:", reviewsList);
  }, [reviewsList]);
  useEffect(() => {
    if (params?.slug) getProduct();
    // getReviewFunc();
    setAccordion(false);
  }, [params?.slug]);

  // useEffect(() => {
  //   if (product?._id) {
  //     checkEligibility();
  //   }
  // }, [product?._id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const checkEligibility = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/review/can-review/${product?._id}/${auth?.user?._id}`
      );
      if (data.success) {
        setCanReview(true);
      }
    } catch (error) {
      console.error("Error checking review eligibility:", error);
    }
  };
  // const getProduct = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/v1/product/get-product/${params.slug}`
  //     );
  //     // Redirect to 404 page if product is not found (data.success is false or product is null)
  //     if (!data.success || !data.product) {
  //       debugger
  //       return navigate("/404");
  //     }
  //     setProduct(data?.product);
  //     getSimilarProduct(data?.product._id, data?.product.category._id);
  //     setReviewsList(data?.product?.reviews);
  //     getAllPhotos(data?.product._id);
  //     // //console.log("here", data?.product?.priceVariants[1].price);

  //     const priceVariants = data?.product?.priceVariants || [];
  //     const ramStorageOptions = priceVariants
  //       // .filter((variant) => variant.ram.length && variant.storage.length)
  //       .map((variant) => ({
  //         ram: variant.ram,
  //         storage: variant.storage,
  //         price: variant.price,
  //         weight: variant.weight,
  //         color: variant.color,
  //         material: variant.material,
  //         waterproof: variant.waterproof,
  //         durability: variant.durability,
  //         displayType: variant.displayType,
  //         processor: variant.processor,
  //         connectivity: variant.connectivity,
  //         noiseCancellation: variant.noiseCancellation,
  //         batteryCapacity: variant.batteryCapacity,
  //         operatingSystem: variant.operatingSystem,
  //         camera: variant.camera,
  //         networkConnectivity: variant.networkConnectivity,
  //         ports: variant.ports,
  //         size: variant.size,
  //         style: variant.style,
  //         genbder: variant.gender,
  //         ageGroup: variant.ageGroup,
  //         author: variant.author,
  //         genre: variant.genre,
  //         language: variant.language,
  //         publisher: variant.publisher,
  //         pagecount: variant.pageCount,
  //       }));

  //     setProductSpec(ramStorageOptions);
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      // Redirect to 404 page if product is not found
      if (!data.success || !data.product) {
        return navigate("/404");
      }

      setProduct(data.product);
      getSimilarProduct(data.product._id, data.product.category._id);
      setReviewsList(data.product.reviews);
      getAllPhotos(data.product._id);

      const priceVariants = data.product.priceVariants || [];
      const ramStorageOptions = priceVariants.map((variant) => ({
        ram: variant.ram,
        storage: variant.storage,
        price: variant.price,
        weight: variant.weight,
        color: variant.color,
        material: variant.material,
        waterproof: variant.waterproof,
        durability: variant.durability,
        displayType: variant.displayType,
        processor: variant.processor,
        connectivity: variant.connectivity,
        noiseCancellation: variant.noiseCancellation,
        batteryCapacity: variant.batteryCapacity,
        operatingSystem: variant.operatingSystem,
        camera: variant.camera,
        networkConnectivity: variant.networkConnectivity,
        ports: variant.ports,
        size: variant.size,
        style: variant.style,
        gender: variant.gender,
        ageGroup: variant.ageGroup,
        author: variant.author,
        genre: variant.genre,
        language: variant.language,
        publisher: variant.publisher,
        pagecount: variant.pageCount,
      }));

      setProductSpec(ramStorageOptions);
    } catch (error) {
      //console.log("Error fetching product:", error);
      navigate("/404");
    }
  };
  //console.log("ram", productspec);
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      ////console.log(error);
    }
  };

  const addReview = (newReview) => {
    setReviewsList((prevReviews) => [...prevReviews, newReview]);
    getNumberOfReviewFunc();
    setCanReview(false);
  };
  const deleteReview = (newReview) => {
    setReviewsList(newReview);
    //console.log(reviewsList);
    //console.log(newReview);
    // getNumberOfReviewFunc();
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  //console.log(product?.publishdate);
  //console.log("selectedspec", selectedspec?.selectedSize);
  const currentDate = new Date();
  const primeStartDate = new Date(product.primestartDate);
  const primeEndDate = new Date(product.primeendDate);
  const isPrimeDayDeal =
    //  product.specialDayTag === "true" &&
    currentDate >= primeStartDate && currentDate <= primeEndDate;

  const [reviews, setReviews] = useState();
  //console.log("isPrimeDayDeal", isPrimeDayDeal);
  //console.log("primeStartDate", primeStartDate);
  //console.log("primeEndDate", primeEndDate);
  //console.log("currentDate", currentDate);
  const renderTabContent = () => {
    switch (selectedOption) {
      case "description":
        if (!selectedspec) return null;
        return (
          <div>
            <h3>Product Specifications:</h3>
            <p>{product?.description}</p>
            {/* <p>
              <strong>Price:</strong> ₹ {selectedspec?.price}
            </p> */}
            {selectedspec?.author &&
              selectedspec?.author.filter((item) => item).length > 0 && (
                <p>
                  <strong>Author:</strong> {selectedspec?.author?.join(", ")}
                </p>
              )}
            {selectedspec?.genre &&
              selectedspec?.genre.filter((item) => item).length > 0 && (
                <p>
                  <strong>Genre:</strong> {selectedspec?.genre?.join(", ")}
                </p>
              )}
            {selectedspec?.language &&
              selectedspec?.language.filter((item) => item).length > 0 && (
                <p>
                  <strong>Language:</strong>{" "}
                  {selectedspec?.language?.join(", ")}
                </p>
              )}
            {selectedspec?.publisher &&
              selectedspec?.publisher.filter((item) => item).length > 0 && (
                <p>
                  <strong>Publisher:</strong>{" "}
                  {selectedspec?.publisher?.join(", ")}
                </p>
              )}
            {selectedspec?.pagecount &&
              selectedspec?.pagecount.filter((item) => item).length > 0 && (
                <p>
                  <strong>Page Count:</strong>{" "}
                  {selectedspec?.pagecount?.join(", ")}
                </p>
              )}
            {product?.publishdate && (
              <p>
                <strong>Publish Date:</strong>{" "}
                {formatDate2(product?.publishdate)}
              </p>
            )}
            {selectedspec?.ram &&
              selectedspec.ram.filter((item) => item).length > 0 && (
                <p>
                  <strong>RAM:</strong> {selectedspec?.ram?.join(", ")}
                </p>
              )}
            {selectedspec?.storage &&
              selectedspec?.storage.filter((item) => item).length > 0 && (
                <p>
                  <strong>Storage:</strong> {selectedspec?.storage?.join(", ")}
                </p>
              )}
            {selectedspec?.processor &&
              selectedspec?.processor.filter((item) => item).length > 0 && (
                <p>
                  <strong>Processor:</strong>{" "}
                  {selectedspec?.processor?.join(", ")}
                </p>
              )}
            {selectedspec?.color &&
              selectedspec?.color.filter((item) => item).length > 0 && (
                <p>
                  <strong>Color:</strong> {selectedspec?.color?.join(", ")}
                </p>
              )}
            {selectedspec?.displayType &&
              selectedspec?.displayType.filter((item) => item).length > 0 && (
                <p>
                  <strong>Display Type:</strong>{" "}
                  {selectedspec?.displayType?.join(", ")}
                </p>
              )}
            {selectedspec?.batteryCapacity &&
              selectedspec?.batteryCapacity.filter((item) => item).length >
                0 && (
                <p>
                  <strong>Battery Capacity:</strong>{" "}
                  {selectedspec?.batteryCapacity?.join(", ")}
                </p>
              )}
            {selectedspec?.networkConnectivity &&
              selectedspec?.networkConnectivity.filter((item) => item).length >
                0 && (
                <p>
                  <strong>Network Connectivity:</strong>{" "}
                  {selectedspec?.networkConnectivity?.join(", ")}
                </p>
              )}
            {selectedspec?.weight &&
              selectedspec?.weight.filter((item) => item).length > 0 && (
                <p>
                  <strong>Weight:</strong> {selectedspec?.weight?.join(", ")}
                </p>
              )}
            {selectedspec?.size &&
              selectedspec?.size.filter((item) => item).length > 0 && (
                <p>
                  <strong>Size:</strong>{" "}
                  {selectedspec?.selectedSize
                    ? selectedspec?.selectedSize
                    : selectedspec?.size?.join(", ")}
                </p>
              )}
            {selectedspec?.material &&
              selectedspec?.material.filter((item) => item).length > 0 && (
                <p>
                  <strong>Material:</strong>{" "}
                  {selectedspec?.material?.join(", ")}
                </p>
              )}
            {selectedspec?.waterproof &&
              selectedspec?.waterproof.filter((item) => item).length > 0 && (
                <p>
                  <strong>Water Proof:</strong>{" "}
                  {selectedspec?.waterproof?.join(", ")}
                </p>
              )}
            {selectedspec?.durability &&
              selectedspec?.durability.filter((item) => item).length > 0 && (
                <p>
                  <strong>Durability:</strong>{" "}
                  {selectedspec?.durability?.join(", ")}
                </p>
              )}
            {selectedspec?.connectivity &&
              selectedspec?.connectivity.filter((item) => item).length > 0 && (
                <p>
                  <strong>Connectivity:</strong>{" "}
                  {selectedspec?.connectivity?.join(", ")}
                </p>
              )}
            {selectedspec?.noiseCancellation &&
              selectedspec?.noiseCancellation.filter((item) => item).length >
                0 && (
                <p>
                  <strong>Noise Cancellation:</strong>{" "}
                  {selectedspec?.noiseCancellation?.join(", ")}
                </p>
              )}
            {selectedspec?.operatingSystem &&
              selectedspec?.operatingSystem.filter((item) => item).length >
                0 && (
                <p>
                  <strong>Operating System:</strong>{" "}
                  {selectedspec?.operatingSystem?.join(", ")}
                </p>
              )}
            {selectedspec?.camera &&
              selectedspec?.camera.filter((item) => item).length > 0 && (
                <p>
                  <strong>Camera:</strong> {selectedspec?.camera?.join(", ")}
                </p>
              )}
            {selectedspec?.ports &&
              selectedspec?.ports.filter((item) => item).length > 0 && (
                <p>
                  <strong>Ports:</strong> {selectedspec?.ports?.join(", ")}
                </p>
              )}

            {/* Add more specifications based on the product's dynamic fields */}
          </div>
        );
      case "reviews":
        return (
          <ReviewSection
            pid={product?._id}
            getLength={getLength}
            // reviewsList={product?.reviews}
            reviewsList={reviewsList}
            addReview={addReview}
            deleteReview={deleteReview}
            canReview={canReview}
          />
        );
      case "additionalInfo":
        return <p>Additional information about the product.</p>;
      default:
        return null;
    }
  };
  const getNumberOfReviewFunc = async () => {
    try {
      const response = await axios.get(
        `/api/v1/review/get-review-length/${product?._id}`
      );
      if (response.data.success) {
        setReviewsLength(response.data.reviewLength);
      }
    } catch (error) {
      toast.error("Failed to get reviews");
    }
  };
  const getLength = () => {
    //console.log("cacll in ");
    if (product?._id) {
      getNumberOfReviewFunc();
    }
  };
  useEffect(() => {
    //console.log("call");
    if (product?._id) {
      getNumberOfReviewFunc();
      setAccordion(true);
    }
  }, [product?._id]);

  const insertproduct = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/past-product-search/insert-past-product-search/${product?._id}/${auth?.user?._id}`
      );
      if (
        data.success &&
        data.message === "Already present in past product search"
      ) {
        dispatch(removePastProduct(data.pastproductsearch.product));
      }
      const newProducts = data.pastproductSearchResults;
      if (newProducts.length > 0) {
        dispatch(addPastProduct(newProducts));
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      insertproduct();
    }, 10000);

    return () => clearTimeout(timer);
  }, [product?._id]);

  const getAllPhotos = async (productId) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-all-photo/${productId}`
      );
      const photoURLs =
        data?.photos?.map((photo) => {
          const url = `data:${photo.contentType};base64,${photo.data}`;
          return url;
        }) || [];
      setPhotos(photoURLs);
      if (photoURLs.length > 0) {
        setMainImage(photoURLs[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleThumbnailHover = (src) => {
    setMainImage(src);
  };
  //console.log(photos);
  return (
    <Layout>
      <div className={`row container mt-2 ${styles.containerMt2}`}>
        <div
          className="col-md-6"
          style={{ display: "grid", justifyContent: "center" }}
        >
          {/* <div style={{ width: "80%" }}> */}
          <div style={{ display: "grid", justifyContent: "center" }}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  // isFluidWidth: true,
                  // src: `/api/v1/product/product-photo/${product._id}`,
                  src: mainImage,
                  width: 420,
                  height: 420,
                  // className: styles.smallImage,
                  // padding: "35px 60px",
                  // sx: {
                  //   padding: "35px 60px",
                  // },
                  className: styles.smallImage,
                },
                largeImage: {
                  // src: `/api/v1/product/product-photo/${product._id}`,
                  src: mainImage,
                  width: 836,
                  height: 1110,
                  border: "1px solid red",
                  // style: {
                  //   zIndex: 1,
                  // },
                },
                isHintEnabled: true,
                lensStyle: {
                  backgroundColor: "rgba(0,0,0,0.4)",
                  width: "15px",
                  height: "15px",
                },
                enlargedImageContainerStyle: {
                  zIndex: 1,
                  height: "500px",
                  width: "500px",
                },
                imageStyle,
              }}
            />
          </div>
          <div className={styles.thumbnailContainer}>
            {photos.slice(0, 4).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Product Thumbnail ${index}`}
                className={styles.thumbnail}
                onMouseEnter={() => handleThumbnailHover(photo)}
              />
            ))}
          </div>
          <div className={styles.thumbnailContainerBelow}>
            {photos.slice(4).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Product Thumbnail ${index}`}
                className={styles.thumbnail}
                onMouseEnter={() => handleThumbnailHover(photo)}
              />
            ))}
          </div>
        </div>
        <div className={`${styles.productDescDiv} col-md-4`}>
          <h6 className={styles.descriptionText}>{product?.description}</h6>
          <p className={styles.brandVisit}>
            {/* Visit the <span className={styles.brandText}>{product?.brand}</span>{" "}
            Store */}
            Visit the{" "}
            <a
              href={product?.websitename}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brandText}
            >
              {product?.brand}
            </a>{" "}
            Store
          </p>
          <h6>
            <CustomerRatting ratings={product?.reviews} />
          </h6>
          <p className={styles.badge}>SnapCart's Choice</p>
          <hr />
          {product?.specialDayTag === "true" && isPrimeDayDeal && (
            <p className={styles.primeDayTag}>Prime Day Deal</p>
          )}
          <div className={styles.discountDetails}>
            <div className={styles.discountPrices}>
              {product?.specialDayTag === "true" && isPrimeDayDeal && (
                <p className={styles.discountPercentage}>
                  - {product?.specialDayOffer}%
                </p>
              )}
              <p className={styles.currentPriceTag}>
                <span className={styles.currentDollar}>₹</span>
                {product?.specialDayTag === "true" && isPrimeDayDeal ? (
                  <span className={styles.currentPrice}>
                    {/* ₹{" "} */}
                    {(
                      ((100 - product?.specialDayOffer) / 100) *
                      selectedspec?.price
                    ).toFixed(2)}
                  </span>
                ) : (
                  // <span className={styles.currentPrice}>{product?.price}</span>
                  <span className={styles.currentPrice}>
                    {selectedspec && selectedspec.price}
                  </span>
                )}
              </p>
            </div>
            <p className={styles.originalMRF}>
              {product?.specialDayTag === "true" && isPrimeDayDeal && (
                <>
                  M.R.P.:{" "}
                  <span className={styles.originalPrice}>
                    ₹ {selectedspec?.price}
                  </span>
                </>
              )}
              {/* {product?.specialDayTag === "true" && isPrimeDayDeal && (
                <>
                  M.R.P.:{" "}
                  <span className={styles.originalPrice}>
                    ₹ {product?.price}
                  </span>
                </>
              )} */}
            </p>

            <p className={styles.inclusiveTaxes}>Inclusive of all taxes</p>
            <Options options={productspec} handleSelect={handleSelect} />
            {/* {selectedspec && (
              <div>
                <p>Selected RAM: {selectedspec.ram} GB</p>
                <p>Selected Storage: {selectedspec.storage}</p>
                <p>Price: ₹{selectedspec.price}</p>
              </div>
            )} */}
            <HorizontalScroll />
          </div>
          <div className={styles.feedBack}>
            <ChatOutlinedIcon />
            <span className={styles.report}>
              {" "}
              Report an issue with this product
            </span>
          </div>
        </div>

        <div className="col-md-2">
          {accordion && (
            <AccordionUtil product={product} selectedspec={selectedspec} />
          )}
        </div>
      </div>

      {/* New Section */}
      <div className={`row container ${styles.reviewsection}`}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${
              selectedOption === "description" ? styles.activeTab : ""
            }`}
            onClick={() => handleOptionChange("description")}
          >
            Description
          </button>

          <button
            className={`${styles.tabButton} ${
              selectedOption === "reviews" ? styles.activeTab : ""
            }`}
            onClick={() => handleOptionChange("reviews")}
          >
            Reviews ({reviewLength})
          </button>
        </div>
        <div className={styles.tabContent}>{renderTabContent()}</div>
      </div>

      <hr />

      {/* Card Section */}
      <MDBContainer className={styles.cardcontainer}>
        <MDBRow className={`mb-4 ${styles.cardContainer}`}>
          <MDBCardText>Similar Products</MDBCardText>
          {relatedProducts.length < 1 && (
            <MDBCardText className="text-center">
              No Similar Products found
            </MDBCardText>
          )}
          <MDBCol lg={isMobile ? "12" : "12"}>
            <MDBRow className={styles.cardGrid}>
              {relatedProducts?.map((p) => (
                <MDBCol
                  xs="6"
                  sm="6"
                  md={isMobile ? "6" : "3"}
                  className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
                  key={p._id}
                >
                  <Link className={styles.cardText}>
                    <MDBCard
                      className={styles.card}
                      onClick={(e) => {
                        e.preventDefault();
                        ScrollToTop();
                        navigate(`/product/${p.slug}`);
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
                              <span className={styles.currentDollar}>₹</span>
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
                            Free Delivery By SnapCarts
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
    </Layout>
  );
}
