import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import styles from "../styles/CategoryProduct.module.css";
import CustomerRatting from "../frontendUtil/CustomerRatting";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
} from "mdb-react-ui-kit";
import useCategory from "../hooks/useCategory";
import { useMediaQuery } from "@mui/material";
import SubCategorySkeleton from "../skeleton/Users/Subcategory/SubCategorySkeleton";


export default function Categories() {
  const categories = useCategory();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cart, setCart] = useCart();
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  //loader
  const [producstLoader, setProducstLoader] = useState(false);

  useEffect(() => {
    if (params?.subname) getProductsByCat();
  }, [params?.subname]);

  const getProductsByCat = async () => {
    try {
      setProducstLoader(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.cname}/${params.subname}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      // Handle error
    } finally {
      // setTimeout(()=>{
      //   setProducstLoader(false)
      // },100000)
      setProducstLoader(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Layout title={"All Categories"}>
      <div style={{ marginTop: "20px" }}>
        <MDBContainer>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>Category - {category?.name}</h4>
            <h6 className={styles.title}>{products?.length} result found</h6>
          </div>
          {producstLoader ? (
            <>
              <SubCategorySkeleton />
            </>
          ) : (
            <>
              <MDBRow className={`mb-4 ${styles.cardContainer}`}>
                {products.map((p) => (
                  <MDBCol
                    md="4"
                    className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
                    key={p._id}
                  >
                    {/* <Link to={`/category/${c.slug}`} className={styles.cardText}> */}
                    <Link className={styles.cardText}>
                      <MDBCard
                        className={styles.card}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${p.slug}`);
                        }}
                      >
                        <MDBCardImage
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
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
                          {/* <MDBCardText>
                        <p className={styles.currentPriceTag}>
                          <span className={styles.currentDollar}>₹</span>
                          <span className={styles.currentPrice}>{p.price}</span>
                        </p>
                      </MDBCardText> */}
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
                              Free Delivery By SnapCartc
                            </p>
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </Link>
                  </MDBCol>
                ))}
              </MDBRow>
            </>
          )}
        </MDBContainer>
      </div>
    </Layout>
  );
}

