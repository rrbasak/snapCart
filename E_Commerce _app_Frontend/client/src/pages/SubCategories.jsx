/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";
import styles from "../styles/Categories.module.css";
import axios from "axios";

export default function SubCategories() {
  const { slug } = useParams();
  const location = useLocation();
  useEffect(() => {
    categoryBasedsubcategories();
  }, [slug, location.state]);

  const cid = location.state.cid;
  //console.log("cid",cid)
  const [subcategories, setSubcategories] = useState([]);
  const categoryBasedsubcategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/subcategory/category-subcategory/${cid}`
      );
      if (data.success) {
        setSubcategories(data.subcategory);
      }
    } catch (error) {
      console.error("Error checking review eligibility:", error);
    }
  };
  //console.log("subcategories", subcategories);
  return (
    <Layout title={"All Categories"}>
      <div style={{ marginTop: "20px" }}>
        <MDBContainer>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Shop by Category</h2>
          </div>
          <MDBRow className={`mb-4 ${styles.cardContainer}`}>
            {subcategories?.map((s) => (
              <MDBCol
                md="4"
                className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
                key={s._id}
              >
                <Link
                  to={`/category/${cid}/${s.subname}`}
                  className={styles.cardText}
                >
                  <MDBCard className={styles.card}>
                    <MDBCardImage
                      // src="/images/m2.png"
                      src={
                        s.photo
                          ? `/api/v1/subcategory/subcategory-photo/${s?._id}`
                          : "/images/m2.png"
                      }
                      position="top"
                      alt={`${s.subname} image`}
                      className={styles.cardImage}
                    />
                    <MDBCardBody className={styles.cardBody}>
                      <MDBCardText>{s.subname}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </Link>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  );
}
