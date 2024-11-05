/* eslint-disable no-whitespace-before-property */
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import styles from "../styles/HomePage.module.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useAuth } from "../context/auth";
import { useDispatch, useSelector } from "react-redux";
import ImageCarousel from "./ImageCarousel";

const HomePage = () => {
  const pastProducts = useSelector((state) => state.pastProduct.pastProducts);
  //console.log("pastProducts", pastProducts);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [allPrimeproducts, setAllPrimeProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useAuth();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [pervrelatedProducts, setPrevRelatedProducts] = useState([]);
  const [dummyOneProducts, setDummyOneProducts] = useState([]);
  const [dummySecProducts, setDummySecProducts] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getAllPrimeProducts();
    getDummyOneProduct();
    getDummySecProduct();
  }, []);

  useEffect(() => {
    if (pastProducts.length === 1) {
      const lastProduct = pastProducts[pastProducts.length - 1]?.product;
      
      if (lastProduct) {
        //console.log("lastProduct", lastProduct);
        getSimilarProduct(lastProduct?._id, lastProduct.category);
      }
    } else if (pastProducts.length >= 2) {
      
      const lastProduct = pastProducts[pastProducts.length - 1]?.product;
      const prevlastProduct = pastProducts[pastProducts.length - 2]?.product;
      if (lastProduct && prevlastProduct) {
        //console.log(lastProduct);
        //console.log("prevlastProduct", prevlastProduct);
        getSimilarProduct(lastProduct?._id, lastProduct.category);
        getPrevSimilarProduct(prevlastProduct?._id, prevlastProduct.category);
      }
    }
  }, [pastProducts]);
  const scrollContainerRef = useRef(null);
  const footerscrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  const footerscrollLeft = () => {
    footerscrollContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const footerscrollRight = () => {
    footerscrollContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-list/");
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllPrimeProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/all-prime-products/");
      setAllPrimeProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  //console.log(categories);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      //console.log("data here", data);
      setRelatedProducts(data?.products.slice(0, 3));
    } catch (error) {
      ////console.log(error);
    }
  };
  const getPrevSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-prev-product/${pid}/${cid}`
      );
      //console.log("data here prev", data);
      setPrevRelatedProducts(data?.products.slice(0, 3));
    } catch (error) {
      ////console.log(error);
    }
  };
  const getDummyOneProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/dummy-one-products`);
      setDummyOneProducts(data?.products.slice(0, 3));
    } catch (error) {
      ////console.log(error);
    }
  };
  const getDummySecProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/dummy-sec-products`);
      setDummySecProducts(data?.products.slice(0, 3));
    } catch (error) {
      ////console.log(error);
    }
  };
  const images = [
    { src: "/images/banner1.jpg", alt: "Image 1" },
    { src: "/images/banner2.jpg", alt: "Image 2" },
    { src: "/images/banner3.jpg", alt: "Image 3" },
    { src: "/images/banner4.jpg", alt: "Image 4" },
    { src: "/images/banner5.jpg", alt: "Image 4" },
  ];
  //console.log("pervrelatedProducts", pervrelatedProducts);
  return (
    <Layout title="Home Page - Your Store">
      <div className={styles.homepageContainer}>
        {/* banner  */}
        <div className={styles.banner}>
          <ImageCarousel images={images} />
        </div>
        {/* First last search Item  */}
        <div className={styles.sections}>
          <div className={styles.section}>
            {!auth?.user?._id ? (
              <>
                <h3>Shop Now</h3>
                {dummyOneProducts && dummyOneProducts.length > 0 && (
                  <div className={styles.productList}>
                    {dummyOneProducts.map((product) => (
                      <div key={product._id} className={styles.productCard}>
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          onClick={() => navigate(`/product/${product.slug}`)}
                        />
                        <p>{product.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : pastProducts.length === 0 ? (
              <>
                <h3>Shop Now</h3>
                {dummyOneProducts && dummyOneProducts.length > 0 && (
                  <div className={styles.productList}>
                    {dummyOneProducts.map((product) => (
                      <div key={product._id} className={styles.productCard}>
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          onClick={() => navigate(`/product/${product.slug}`)}
                        />
                        <p>{product.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h3>Pick up where you left off</h3>
                <div className={styles.productList}>
                  {pastProducts?.length > 0 && (
                    <div
                      key={
                        pastProducts[pastProducts.length - 1]?.product
                          ?.pastProducts_id
                      }
                      className={styles.productCard}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${
                          pastProducts[pastProducts?.length - 1]?.product?._id
                        }`}
                        alt={
                          pastProducts[pastProducts?.length - 1]?.product?.name
                        }
                        onClick={() =>
                          navigate(
                            `/product/${
                              pastProducts[pastProducts?.length - 1]?.product
                                ?.slug
                            }`
                          )
                        }
                      />
                      <p>
                        {pastProducts[pastProducts?.length - 1]?.product?.name}
                      </p>
                    </div>
                  )}
                  {relatedProducts?.length > 0 &&
                    relatedProducts?.map((product) => (
                      <div key={product?._id} className={styles.productCard}>
                        <img
                          src={`/api/v1/product/product-photo/${product?._id}`}
                          alt={product?.name}
                          onClick={() => navigate(`/product/${product.slug}`)}
                        />
                        <p>{product?.name}</p>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
          {/* Second Last search Item  */}
          <div className={styles.section}>
            {!auth?.user?._id ? (
              <>
                <h3>Categories to explore</h3>
                <div className={styles.productList}>
                  {categories.map((category) => (
                    <div key={category?._id} className={styles.productCard}>
                      <img
                        src={
                          category.photo
                            ? `/api/v1/category/category-photo/${category?._id}`
                            : "/images/a3.png"
                        }
                        alt={category.name}
                        onClick={() => {
                          // //console.log("cid", category._id);
                          navigate(`/category/${category?.slug}`, {
                            state: { cid: category._id },
                          });
                        }}
                      />
                      <p>{category.name}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : pastProducts.length === 1 || pastProducts.length === 0 ? (
              <>
                <h3>Get upto 20% offer</h3>
                {dummySecProducts && dummySecProducts.length > 0 && (
                  <div className={styles.productList}>
                    {dummySecProducts.map((product) => (
                      <div key={product._id} className={styles.productCard}>
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          onClick={() => navigate(`/product/${product.slug}`)}
                        />
                        <p>{product.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h3>Keep shopping for</h3>
                <div className={styles.productList}>
                  {pastProducts?.length > 0 && (
                    <div
                      key={
                        pastProducts[pastProducts.length - 2]?.product
                          ?.pastProducts_id
                      }
                      className={styles.productCard}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${
                          pastProducts[pastProducts?.length - 2]?.product?._id
                        }`}
                        alt={
                          pastProducts[pastProducts?.length - 2]?.product?.name
                        }
                        onClick={() =>
                          navigate(
                            `/product/${
                              pastProducts[pastProducts?.length - 2]?.product
                                ?.slug
                            }`
                          )
                        }
                      />
                      <p>
                        {pastProducts[pastProducts?.length - 2]?.product?.name}
                      </p>
                    </div>
                  )}
                  {pervrelatedProducts?.length > 0 &&
                    pervrelatedProducts?.map((product) => (
                      <div key={product?._id} className={styles.productCard}>
                        <img
                          src={`/api/v1/product/product-photo/${product?._id}`}
                          alt={product?.name}
                          onClick={() => navigate(`/product/${product.slug}`)}
                        />
                        <p>{product?.name}</p>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.section}>
            {!auth?.user?._id ? (
              <>
                <div className={styles.horizontalScrollContainerBeforeLogin}>
                  <h3>Sign in for your best experience</h3>
                  <button className={styles.Footerbutton}>
                    <Link to="/login" className={styles.footerlink}>
                      Sign in securely
                    </Link>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Categories to explore</h3>
                <div className={styles.productList}>
                  {categories.map((category) => (
                    <div key={category?._id} className={styles.productCard}>
                      <img
                        src={
                          category.photo
                            ? `/api/v1/category/category-photo/${category?._id}`
                            : "/images/a3.png"
                        }
                        alt={category.name}
                        onClick={() =>
                          navigate(`/category/${category?.slug}`, {
                            state: { cid: category._id },
                          })
                        }
                      />
                      <p>{category.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Advertisement  */}
        <div className={styles.advertisementContainer}>
          <div className={styles.advertisement}>
            <img src="/images/advbanner.jpg" alt="Advertisement" />
          </div>
          {/* random products list  */}
          <div className={styles.headerCategory}>
            <img src="/images/offerbanner.jpg" alt="Advertisement" />
          </div>
        </div>

        <div className={styles.horizontalScrollContainer}>
          {allPrimeproducts.length > 0 ? (
            <>
              <h3 className={styles.scrollbarheader}>Prime Products</h3>
              <ArrowBackIosOutlinedIcon
                className={`${styles.arrowIcon} ${styles.arrowBack}`}
                onClick={scrollLeft}
              />
              <div ref={scrollContainerRef} className={styles.horizontalScroll}>
                {allPrimeproducts.map((product) => (
                  <div
                    key={product?._id}
                    className={styles.productCardInHorizontal}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${product?._id}`}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.slug}`)}
                    />
                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
              <ArrowForwardIosOutlinedIcon
                className={`${styles.arrowIcon} ${styles.arrowForward}`}
                onClick={scrollRight}
              />
            </>
          ) : (
            <>
              <h3 className={styles.scrollbarheader}>Featured Products</h3>
              <ArrowBackIosOutlinedIcon
                className={`${styles.arrowIcon} ${styles.arrowBack}`}
                onClick={scrollLeft}
              />
              <div ref={scrollContainerRef} className={styles.horizontalScroll}>
                {products.map((product) => (
                  <div
                    key={product?._id}
                    className={styles.productCardInHorizontal}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${product?._id}`}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.slug}`)}
                    />
                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
              <ArrowForwardIosOutlinedIcon
                className={`${styles.arrowIcon} ${styles.arrowForward}`}
                onClick={scrollRight}
              />
            </>
          )}
        </div>
      </div>
      {/* Footer Section for browsing history*/}
      <footer className={styles.footer}>
        {auth?.user?._id ? (
          <div className={styles.horizontalScrollContainer}>
            <h3 className={styles.scrollbarheader}>Your browsing history</h3>
            <ArrowBackIosOutlinedIcon
              className={`${styles.arrowIcon} ${styles.arrowBack}`}
              onClick={footerscrollLeft}
            />
            <div
              ref={footerscrollContainerRef}
              className={styles.horizontalScroll}
            >
              {pastProducts?.length > 0 ? (
                pastProducts.map((fullItem) => (
                  <div
                    key={fullItem?.product?._id}
                    className={styles.productCard}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${fullItem?.product?._id}`}
                      alt={fullItem?.product?.name}
                      onClick={() =>
                        navigate(`/product/${fullItem?.product?.slug}`)
                      }
                    />
                    <p>{fullItem?.product?.name}</p>
                  </div>
                ))
              ) : (
                <div className={styles.horizontalScrollContainerBeforeLogin}>
                  <p
                    className={styles.horizontalScrollContainerBeforeLoginPara}
                  >
                    After viewing product detail pages, look here to find an
                    easy way to navigate back to pages you are interested in.
                  </p>
                </div>
              )}
            </div>
            <ArrowForwardIosOutlinedIcon
              className={`${styles.arrowIcon} ${styles.arrowForward}`}
              onClick={footerscrollRight}
            />
          </div>
        ) : (
          <div className={styles.horizontalScrollContainerBeforeLogin}>
            <p className={styles.horizontalScrollContainerBeforeLoginPara}>
              See personalized recommendations
            </p>
            <button className={styles.Footerbutton}>
              <Link to="/login" className={styles.footerlink}>
                Sign in
              </Link>
            </button>
            <p>
              New customer?{" "}
              <span className={styles.footerlink}>
                <Link to="/login" className={styles.footerlink}>
                  Start here.
                </Link>
              </span>
            </p>
          </div>
        )}
      </footer>
    </Layout>
  );
};

export default HomePage;
